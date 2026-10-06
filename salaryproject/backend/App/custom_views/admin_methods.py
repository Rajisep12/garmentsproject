from rest_framework.decorators import api_view, permission_classes, parser_classes,renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated,AllowAny
from django.db.models import Q
from App.models import (TblEmployee,TblUser,TblCustomer,TblOrder,TblTax,TblBill,TblPayment,TblBillitems)
from App.serializers.serializers import ( TblTaxSerializer,TblEmployeeSerializer, TblOrderSerializer,TblCustomerSerializer,TblUserSerializer,TblCustomerSerializer,TblOrderSerializer,TblBillSerializer,TblPaymentSerializer,TblBillitemsSerializer)
from django.conf import settings
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache
from datetime import datetime
from django.utils import timezone

#import inflect
import re
from django.views.decorators.csrf import csrf_exempt
import os
from django.conf import settings
#from barcode import Code128
#from barcode.writer import ImageWriter
from django.http import FileResponse, Http404
from django.template.loader import render_to_string
from django.http import HttpResponse
import tempfile
import io
from xhtml2pdf import pisa
import io
import zipfile
from django.template.loader import render_to_string
from django.http import HttpResponse
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

paginator = CustomPagination()

def get_object_or_404(model, pk):
    try:
        return model.objects.get(pk=pk, is_deleted=False)
    except model.DoesNotExist:
        return None
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def employee_list_create(request):  

    if request.method == 'POST':
        serializer = TblEmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    search_query = request.GET.get('search', '')
    fetch_all = request.GET.get('all', 'false').lower() == 'true'

    queryset = TblEmployee.objects.filter(is_deleted=False)

    if search_query:
        queryset = queryset.filter(name__icontains=search_query)

    # ✅ If all=true return full list
    if fetch_all:
        serializer = TblEmployeeSerializer(queryset, many=True)
        return Response({
            "count": queryset.count(),
            "results": serializer.data
        })

    # ✅ Default pagination
    page = paginator.paginate_queryset(queryset, request)
    serializer = TblEmployeeSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)
    
@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def employee_update_delete(request, pk):
    instance = get_object_or_404(TblEmployee, pk)
    if not instance:
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method in ['PUT', 'PATCH']:
        serializer = TblEmployeeSerializer(instance, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    instance.is_deleted = True
    instance.save()
    return Response({"message": "Employee deleted"}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def customer_list_create(request):  

    if request.method == 'POST':
        serializer = TblCustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    search_query = request.GET.get('search', '')
    fetch_all = request.GET.get('all', 'false').lower() == 'true'

    queryset = TblCustomer.objects.filter(is_deleted=False).order_by('id')

    if search_query:
        queryset = queryset.filter(name__icontains=search_query)

    # ✅ If all=true return full list
    if fetch_all:
        serializer = TblCustomerSerializer(queryset, many=True)
        return Response({
            "count": queryset.count(),
            "results": serializer.data
        })

    # ✅ Default pagination
    page = paginator.paginate_queryset(queryset, request)
    serializer = TblCustomerSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)
    
@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def customer_update_delete(request, pk):
    instance = get_object_or_404(TblCustomer, pk)
    if not instance:
        return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method in ['PUT', 'PATCH']:
        serializer = TblCustomerSerializer(instance, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    instance.is_deleted = True
    instance.save()
    return Response({"message": "Customer deleted"}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def tax_list_create(request):  

    if request.method == 'POST':
        serializer = TblTaxSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    search_query = request.GET.get('search', '')
    fetch_all = request.GET.get('all', 'false').lower() == 'true'

    queryset = TblTax.objects.filter(is_deleted=False).order_by('-id')

    if search_query:
        queryset = queryset.filter(name__icontains=search_query)

    # ✅ If all=true return full list
    if fetch_all:
        serializer = TblTaxSerializer(queryset, many=True)
        return Response({
            "count": queryset.count(),
            "results": serializer.data
        })

    # ✅ Default pagination
    page = paginator.paginate_queryset(queryset, request)
    serializer = TblTaxSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)
    
@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def tax_update_delete(request, pk):
    instance = get_object_or_404(TblTax, pk)
    if not instance:
        return Response({"error": "Tax not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method in ['PUT', 'PATCH']:
        serializer = TblTaxSerializer(instance, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    instance.is_deleted = True
    instance.save()
    return Response({"message": "Tax deleted"}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def payment_list_create(request):  

    if request.method == 'POST':
        serializer = TblPaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    search_query = request.GET.get('search', '')
    fetch_all = request.GET.get('all', 'false').lower() == 'true'

    queryset = TblPayment.objects.filter(is_deleted=False).order_by('-id')

    # if search_query:
    #     queryset = queryset.filter(name__icontains=search_query)

    # ✅ If all=true return full list
    if fetch_all:
        serializer = TblPaymentSerializer(queryset, many=True)
        return Response({
            "count": queryset.count(),
            "results": serializer.data
        })

    # ✅ Default pagination
    page = paginator.paginate_queryset(queryset, request)
    serializer = TblPaymentSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)
    
@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def payment_update_delete(request, pk):
    instance = get_object_or_404(TblPayment, pk)
    if not instance:
        return Response({"error": "Payment not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method in ['PUT', 'PATCH']:
        serializer = TblPaymentSerializer(instance, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    instance.is_deleted = True
    instance.save()
    return Response({"message": "Payment deleted"}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def order_list_create(request):  

    if request.method == 'POST':
        serializer = TblOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    search_query = request.GET.get('search', '')
    fetch_all = request.GET.get('all', 'false').lower() == 'true'

    queryset = TblOrder.objects.filter(is_deleted=False)

    if search_query:
        queryset = queryset.filter(name__icontains=search_query)

    # ✅ If all=true return full list
    if fetch_all:
        serializer = TblOrderSerializer(queryset, many=True)
        return Response({
            "count": queryset.count(),
            "results": serializer.data
        })

    # ✅ Default pagination
    page = paginator.paginate_queryset(queryset, request)
    serializer = TblOrderSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def bill_list_create(request):  

    if request.method == 'POST':        
        serializer = TblBillSerializer(data=request.data)
        if serializer.is_valid():            
            ser = serializer.save()            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    search_query = request.GET.get('search', '')
    
    queryset = TblBill.objects.all().order_by('-id')

    if search_query:
        queryset = queryset.filter(invoice_no__icontains=search_query)

    # ✅ Default pagination
    page = paginator.paginate_queryset(queryset, request)
    serializer = TblBillSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)
    
@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def bill_update_delete(request, pk):
    instance = get_object_or_404(TblBill, pk)
    if not instance:
        return Response({"error": "Bill not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method in ['PUT', 'PATCH']:
        serializer = TblBillSerializer(instance, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    instance.is_deleted = True
    instance.save()
    return Response({"message": "Bill deleted"}, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_last_invoice(request):
    last_bill = TblBill.objects.order_by("-id").first()

    return Response({
        "invoice_no": last_bill.invoice_no if last_bill else None
    })


def generate_invoice_html(request, invoice_id):
    invoice = TblBill.objects.get(id=invoice_id)
    html_string = render_to_string('bill/invoice2.html', {'invoice': invoice})
    
    # Save as HTML file
    from django.core.files.base import ContentFile
    
    html_content = ContentFile(html_string.encode('utf-8'))
    invoice.pdf_file.save(f'invoice_{invoice.id}.html', html_content)
    
    return HttpResponse('HTML file generated and saved!')


def generate_invoice_pdf(request, invoice_id):
    try:
        invoice = TblBill.objects.get(id=invoice_id)
        print(f"✅ Invoice found: {invoice.id}")
    except TblBill.DoesNotExist:
        return HttpResponse(
            f"Invoice {invoice_id} not found",
            status=404
        )

    # Convert "/" to "_" for a safe filename
    safe_invoice_no = invoice.invoice_no.replace("/", "_")

    print(f"Invoice No: {invoice.invoice_no}")
    print(f"Safe Invoice No: {safe_invoice_no}")

    copies = [
        (
            'Original Copy',
            f'invoice_{safe_invoice_no}_originalcopy.pdf'
        ),
    ]

    pdf_files = {}

    for copy_label, filename in copies:
        try:
            print(f"⏳ Rendering: {copy_label}")

            html_string = render_to_string(
                'bill/invoice2.html',
                {
                    'invoice': invoice,
                    'copy_label': copy_label,
                }
            )

            print(
                f"✅ HTML rendered for {copy_label}, "
                f"length: {len(html_string)}"
            )

            pdf_bytes = HTML(
                string=html_string,
                base_url=request.build_absolute_uri('/')
            ).write_pdf()

            print(
                f"✅ PDF generated for {copy_label}, "
                f"size: {len(pdf_bytes)} bytes"
            )

            pdf_files[filename] = pdf_bytes

        except Exception as e:
            print(f"❌ Error generating {copy_label}: {e}")
            import traceback
            traceback.print_exc()

            return HttpResponse(
                f"Error generating {copy_label}: {str(e)}",
                status=500
            )

    # Build ZIP
    try:
        zip_buffer = io.BytesIO()

        with zipfile.ZipFile(
            zip_buffer,
            'w',
            zipfile.ZIP_DEFLATED
        ) as zip_file:

            for filename, pdf_bytes in pdf_files.items():
                zip_file.writestr(filename, pdf_bytes)

        zip_buffer.seek(0)

        zip_size = len(zip_buffer.getvalue())

        print(f"✅ ZIP created, size: {zip_size} bytes")

    except Exception as e:
        print(f"❌ ZIP error: {e}")
        return HttpResponse(
            f"ZIP error: {str(e)}",
            status=500
        )

    # Save original PDF to DB
    try:
        original_filename = (
            f'invoice_{safe_invoice_no}_originalcopy.pdf'
        )

        invoice.pdf_file.save(
            original_filename,
            io.BytesIO(pdf_files[original_filename]),
            save=True
        )

        print(f"✅ Saved to DB: {original_filename}")

    except Exception as e:
        print(f"❌ DB save error: {e}")

    response = HttpResponse(
        zip_buffer,
        content_type='application/zip'
    )

    response['Content-Disposition'] = (
        f'attachment; '
        f'filename="invoice_{safe_invoice_no}_copies.zip"'
    )

    response['Content-Length'] = zip_size

    print("✅ Sending ZIP response")

    return response