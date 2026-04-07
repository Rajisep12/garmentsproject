from rest_framework import serializers
from App.models import (TblUser,TblEmployee,TblCustomer,TblOrder,TblTax,TblBill,TblBillitems)
import re

class TblUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = TblUser
        fields = '__all__'

    
class TblEmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = TblEmployee
        fields = '__all__'

    
class TblCustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = TblCustomer
        fields = '__all__'


class TblTaxSerializer(serializers.ModelSerializer):

    class Meta:
        model = TblTax
        fields = '__all__'

      
class TblOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = TblOrder
        fields = '__all__'

    
class TblBillitemsSerializer(serializers.ModelSerializer):

    class Meta:
        model = TblBillitems
        fields = '__all__'


    
class TblBillSerializer(serializers.ModelSerializer):
    items = TblBillitemsSerializer(many=True, write_only=True)

    class Meta:
        model = TblBill
        fields = '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items')  # 👈 remove items

        bill = TblBill.objects.create(**validated_data)

        for item in items_data:
            TblBillitems.objects.create(
                bill=bill,   # 👈 FK link
                **item
            )

        return bill