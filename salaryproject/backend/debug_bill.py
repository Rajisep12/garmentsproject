import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import django
django.setup()

from App.serializers.serializers import TblBillSerializer

payload = {
    'customer': '8',
    'invoice_no': 'HG-21/26-27',
    'invoice_date': '2026-08-31',
    'reverse_charge': False,
    'supply_date': '2026-08-31',
    'tax': None,
    'place': 'Tirupur',
    'cgst': '2.5',
    'sgst': '2.5',
    'igst': '0.0',
    'transport_mode': 'Road',
    'transport_vehicle': '',
    'cgst_amt': '624.75',
    'total_amt': '24990.00',
    'sgst_amt': '624.75',
    'igst_amt': '0.00',
    'total_gst': '26239.50',
    'items': [
        {'product': 'Trunks', 'hsn': '998822', 'qty': 1785, 'rate': 7, 'amt': 12495, 'discount': 0, 'total_amt': 12495},
        {'product': 'Trunks', 'hsn': '998822', 'qty': 1785, 'rate': 7, 'amt': 12495, 'discount': 0, 'total_amt': 12495},
    ],
}

serializer = TblBillSerializer(data=payload)
print('is_valid=', serializer.is_valid())
if not serializer.is_valid():
    print(serializer.errors)
else:
    try:
        obj = serializer.save()
        print('saved', obj)
    except Exception as e:
        import traceback; traceback.print_exc()
