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

    def to_internal_value(self, data):
        data = data.copy()

        if 'amount' in data and 'amt' not in data:
            data['amt'] = data.pop('amount')
        elif 'amount' in data and 'amt' in data:
            data.pop('amount')

        if 'total' in data and 'total_amt' not in data:
            data['total_amt'] = data.pop('total')
        elif 'total' in data and 'total_amt' in data:
            data.pop('total')

        return super().to_internal_value(data)


    
class TblBillSerializer(serializers.ModelSerializer):
    items = TblBillitemsSerializer(many=True, write_only=True)

    class Meta:
        model = TblBill
        fields = '__all__'

    def to_internal_value(self, data):
        data = data.copy()
        if data.get('tax') in ('', None):
            data['tax'] = None
        return super().to_internal_value(data)

    def validate(self, attrs):
        items = attrs.get('items', [])
        valid_items = []

        for item in items:
            product = (item.get('product') or '').strip()
            if product:
                valid_items.append(item)

        if not valid_items:
            raise serializers.ValidationError({"items": ["At least one valid item is required."]})

        attrs['items'] = valid_items
        return attrs

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])

        try:
            # Create bill only once
            bill = TblBill.objects.create(**validated_data)
            print("bill created", bill)

            # Create bill items
            for index, item in enumerate(items_data):

                # Ignore blank rows from frontend
                if not (item.get('product') or '').strip():
                    continue

                try:
                    TblBillitems.objects.create(
                        bill=bill,
                        **item
                    )

                except Exception as e:
                    raise serializers.ValidationError({
                        "items": {
                            "row": index + 1,
                            "error": str(e)
                        }
                    })

            return bill

        except serializers.ValidationError:
            raise

        except Exception as e:
            raise serializers.ValidationError({
                "error": str(e)
            })