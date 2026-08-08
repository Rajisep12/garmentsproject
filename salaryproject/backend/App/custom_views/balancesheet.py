
from decimal import Decimal
 
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
 
# --- adjust these two imports to your real app paths -----------------------
from App.models import TblCustomer          # <-- adjust import path
from App.models import TblBill                     # <-- adjust import path
# -----------------------------------------------------------------------
 
INVOICE_AMOUNT_FIELD = "total_gst"  # <-- change if your real amount field differs
 
 
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def customer_balance_sheet(request, customer_id):
    print(f"Generating balance sheet for customer_id={customer_id}")
    """
    GET /admin/customer/<customer_id>/balance-sheet/
 
    Returns a running ledger for one customer, built from their Bill records:
 
    {
        "customer_id": 4,
        "customer_name": "Ravi Textiles",
        "opening_balance": 0.0,
        "total_debit": 45000.0,
        "total_credit": 0.0,
        "closing_balance": 45000.0,
        "transactions": [
            {
                "id": 12,
                "date": "2026-05-01",
                "description": "Invoice INV-0012",
                "debit": 15000.0,
                "credit": 0.0,
                "balance": 15000.0
            },
            ...
        ]
    }
    """
    customer = get_object_or_404(TblCustomer, id=customer_id)
    print(f"Found customer: {customer.name}")
    bills = (
        TblBill.objects.filter(customer=customer)
        .order_by("created_at")  # <-- adjust to your real date field if different
    )
 
    opening_balance = Decimal("0.00")  # no prior-period ledger to carry forward
    running_balance = opening_balance
    total_debit = Decimal("0.00")
    total_credit = Decimal("0.00")
    transactions = []
 
    for bill in bills:
        debit = Decimal(str(getattr(bill, INVOICE_AMOUNT_FIELD, 0) or 0))
        credit = Decimal("0.00")  # TODO: merge in Payment records here if/when you add them
 
        running_balance += debit - credit
        total_debit += debit
        total_credit += credit
 
        transactions.append(
            {
                "id": bill.id,
                "date": bill.created_at.strftime("%Y-%m-%d"),  # <-- adjust field name if needed
                "description": f"Invoice {bill.invoice_no}",
                "debit": float(debit),
                "credit": float(credit),
                "balance": float(running_balance),
            }
        )
 
    return Response(
        {
            "customer_id": customer.id,
            "customer_name": getattr(customer, "name", str(customer)),
            "opening_balance": float(opening_balance),
            "total_debit": float(total_debit),
            "total_credit": float(total_credit),
            "closing_balance": float(running_balance),
            "transactions": transactions,
        }
    )