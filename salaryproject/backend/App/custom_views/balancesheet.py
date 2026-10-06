from decimal import Decimal
from datetime import date

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from App.models import TblCustomer, TblBill, TblPayment  # <-- adjust import paths

INVOICE_AMOUNT_FIELD = "total_gst"


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def customer_balance_sheet(request, customer_id):
    """
    One row per invoice: debit = invoice amount, credit = sum of all
    payments received against that invoice, balance = running total.

    Any payment not linked to a bill (advance/on-account payment) gets its
    own row with debit = 0, since there's no invoice to attach it to.
    """
    customer = get_object_or_404(TblCustomer, id=customer_id)

    bills = TblBill.objects.filter(
        customer=customer, is_deleted=False
    ).order_by("invoice_date", "created_at")

    payments = TblPayment.objects.filter(
        bill__customer=customer, is_deleted=False
    ).select_related("bill")

    orphan_payments = TblPayment.objects.filter(
        customer=customer, bill__isnull=True, is_deleted=False
    ).order_by("payment_date", "created_at")

    # Group payments by bill_id so each invoice can sum its own payments
    payments_by_bill = {}
    for p in payments:
        payments_by_bill.setdefault(p.bill_id, []).append(p)

    opening_balance = Decimal("0.00")
    total_debit = Decimal("0.00")
    total_credit = Decimal("0.00")
    raw_entries = []

    for bill in bills:
        bill_date = bill.invoice_date or (bill.created_at.date() if bill.created_at else None)
        debit = Decimal(str(getattr(bill, INVOICE_AMOUNT_FIELD, 0) or 0))

        bill_payments = payments_by_bill.get(bill.id, [])
        credit = sum((Decimal(str(p.payment_amount or 0)) for p in bill_payments), Decimal("0.00"))

        # Row date: latest payment date if fully/partly paid, else invoice date
        row_date = bill_date
        if bill_payments:
            paid_dates = [p.payment_date or (p.created_at.date() if p.created_at else None) for p in bill_payments]
            paid_dates = [d for d in paid_dates if d]
            if paid_dates:
                row_date = max(paid_dates)

        cheque_refs = ", ".join(p.cheque_no for p in bill_payments if p.cheque_no)
        description = f"Invoice {bill.invoice_no}"
        if cheque_refs:
            description += f" (Chq #{cheque_refs})"

        # Build absolute URL so the frontend can open it directly
        pdf_url = request.build_absolute_uri(bill.pdf_file.url) if bill.pdf_file else None


        raw_entries.append({
            "sort_date": bill_date,   # keep invoices ordered by invoice date, not payment date
            "id": f"bill-{bill.id}",
            "date": row_date.strftime("%Y-%m-%d") if row_date else "",
            "description": description,
            "debit": debit,
            "credit": credit,
            "invoice_id": bill.id,
            "pdf_url": pdf_url,
            "type": "bill",
        })

    # Payments with no linked bill — advance/on-account credit, shown standalone
    for payment in orphan_payments:
        pay_date = payment.payment_date or (payment.created_at.date() if payment.created_at else None)
        credit = Decimal(str(payment.payment_amount or 0))
        description = "Payment received (on account)"
        if payment.cheque_no:
            description += f" (Chq #{payment.cheque_no})"

        raw_entries.append({
            "sort_date": pay_date,
            "id": f"payment-{payment.id}",
            "date": pay_date.strftime("%Y-%m-%d") if pay_date else "",
            "description": description,
            "debit": Decimal("0.00"),
            "credit": credit,
            "invoice_id": None,
            "type": "payment",
        })

    raw_entries.sort(key=lambda e: (e["sort_date"] or date.max, 0 if e["type"] == "bill" else 1))

    running_balance = opening_balance
    transactions = []
    for entry in raw_entries:
        running_balance += entry["debit"] - entry["credit"]
        total_debit += entry["debit"]
        total_credit += entry["credit"]
        transactions.append({
            "id": entry["id"],
            "date": entry["date"],
            "description": entry["description"],
            "debit": float(entry["debit"]),
            "credit": float(entry["credit"]),
            "balance": float(running_balance),
            "invoice_id": entry["invoice_id"],
            "pdf_url": entry.get("pdf_url"), 
            "type": entry["type"],
        })

    return Response({
        "customer_id": customer.id,
        "customer_name": getattr(customer, "name", str(customer)),
        "opening_balance": float(opening_balance),
        "total_debit": float(total_debit),
        "total_credit": float(total_credit),
        "closing_balance": float(running_balance),
        "transactions": transactions,
    })