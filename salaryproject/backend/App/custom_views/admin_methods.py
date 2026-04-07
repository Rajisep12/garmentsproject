from rest_framework.decorators import api_view, permission_classes, parser_classes,renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated,AllowAny
from django.db.models import Q
from App.models import (TblEmployee,TblUser,TblCustomer,TblOrder,TblTax,TblBill)
from App.serializers.serializers import ( TblTaxSerializer,TblEmployeeSerializer, TblOrderSerializer,TblCustomerSerializer,TblUserSerializer,TblCustomerSerializer,TblOrderSerializer,TblBillSerializer)
from django.conf import settings
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache
from datetime import datetime
from django.utils import timezone

import inflect
import re
from django.views.decorators.csrf import csrf_exempt
import os
from django.conf import settings
from barcode import Code128
from barcode.writer import ImageWriter
from django.http import FileResponse, Http404

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

    queryset = TblCustomer.objects.filter(is_deleted=False)

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

    queryset = TblTax.objects.filter(is_deleted=False)

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
        print("post")
        print(request.data)
        serializer = TblBillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    search_query = request.GET.get('search', '')
    
    queryset = TblBill.objects.filter(is_deleted=False)

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