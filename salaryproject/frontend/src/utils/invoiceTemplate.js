// src/utils/invoiceTemplate.js
export const generateInvoiceHTML = (data) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hayati Garments – Tax Invoice</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&family=Roboto+Condensed:wght@400;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #d0d0d0;
      font-family: 'Roboto', sans-serif;
      font-size: 11px;
      color: #000;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 20px auto;
      background: #fff;
      padding: 6mm 8mm;
      border: 2px solid #000;
    }

    @media print {
      body {
        background: #fff;
      }

      .page {
        margin: 0;
        border: none;
        padding: 6mm 8mm;
      }

      @page {
        size: A4;
        margin: 0;
      }
    }

    /* ── HEADER ── */
    .header {
      text-align: center;
      border-bottom: 2px solid #000;
      padding-bottom: 4px;
      margin-bottom: 0;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 10.5px;
      font-weight: 700;
      padding: 3px 0 2px;
    }

    .header-title {
      text-align: center;
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 2px 0;
      border-top: 1.5px solid #000;
      border-bottom: 1.5px solid #000;
      margin: 2px 0;
    }

    .company-name {
      font-size: 36px;
      font-weight: 900;
      letter-spacing: 2px;
      line-height: 1.1;
      text-transform: uppercase;
    }

    .company-address {
      font-size: 11px;
      font-weight: 700;
      margin-top: 2px;
    }

    .company-email {
      font-size: 11px;
      font-weight: 700;
    }

    /* ── TABLES ── */
    table {
      width: 100%;
      border-collapse: collapse;
    }

    td,
    th {
      border: 1.2px solid #000;
      padding: 3px 5px;
      vertical-align: middle;
    }

    /* ── META INFO ── */
    .meta-table td {
      font-size: 10.5px;
      font-weight: 700;
    }

    .meta-label {
      font-weight: 700;
      white-space: nowrap;
    }

    .meta-value {
      min-width: 90px;
    }

    input[type="text"],
    input[type="date"] {
      border: none;
      outline: none;
      width: 100%;
      font-family: inherit;
      font-size: 10.5px;
      background: transparent;
    }

    /* ── PARTY SECTION ── */
    .party-header th {
      text-align: center;
      font-weight: 700;
      font-size: 11px;
      background: #f0f0f0;
    }

    .party-table td {
      font-size: 10.5px;
      font-weight: 700;
    }

    .party-name-row td {
      height: 36px;
      vertical-align: top;
      padding-top: 4px;
    }

    /* ── GOODS TABLE ── */
    .goods-header th {
      text-align: center;
      font-weight: 700;
      font-size: 10.5px;
      background: #f0f0f0;
      padding: 4px 3px;
    }

    .goods-row td {
      height: 22px;
      font-size: 10.5px;
      border-top: none;
      border-bottom: none;
    }

    .goods-row td input {
      font-size: 10.5px;
    }

    .total-row td {
      font-weight: 900;
      font-size: 11px;
    }

    /* ── BOTTOM SECTION ── */
    .bottom-table td {
      font-size: 10px;
      vertical-align: top;
    }

    .words-cell {
      width: 55%;
      padding: 5px;
    }

    .tax-label {
      font-weight: 700;
      font-size: 10px;
    }

    .tax-value {
      min-width: 60px;
    }

    .bank-section {
      padding: 5px;
    }

    .bank-section h4 {
      font-size: 12px;
      font-weight: 900;
      text-align: center;
      margin-bottom: 4px;
    }

    .bank-section p {
      font-size: 10.5px;
      font-weight: 700;
      line-height: 1.7;
    }

    .terms-cell {
      padding: 5px;
    }

    .terms-cell h4 {
      font-size: 11px;
      font-weight: 900;
      text-align: center;
      margin-bottom: 4px;
    }

    .signatory-cell {
      text-align: center;
      font-weight: 700;
      font-size: 10.5px;
      padding: 5px;
    }

    .signatory-cell .for-text {
      font-size: 11px;
      font-weight: 900;
      margin-top: 4px;
    }

    .signatory-cell .auth-text {
      margin-top: 30px;
      font-weight: 700;
    }

    .declaration {
      padding: 5px;
    }

    .declaration span {
      font-weight: 900;
      font-size: 10.5px;
      text-decoration: underline;
    }

    .declaration p {
      font-size: 9.5px;
      margin-top: 2px;
    }

    .footer-text {
      text-align: center;
      font-weight: 900;
      font-size: 11px;
      padding: 4px;
      letter-spacing: 0.5px;
    }

    .eo-cell {
      text-align: right;
      font-weight: 700;
      font-size: 10px;
      padding: 2px 5px;
    }

    .print-btn {
      display: block;
      margin: 10px auto;
      padding: 8px 30px;
      background: #222;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      font-family: inherit;
    }

    .print-btn:hover {
      background: #444;
    }

    @media print {
      .print-btn {
        display: none;
      }
    }

    .text-center {
      text-align: center;
    }

    .border-none {
      border: none !important;
    }

    .no-border-top {
      border-top: none !important;
    }

    .no-border-bottom {
      border-bottom: none !important;
    }

    .bold {
      font-weight: 700;
    }
  </style>
</head>

<body>

  <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>

  <div class="page">

    <!-- HEADER -->
    <div class="header">
      <div class="header-top">
        <span>GSTIN : 33FBHPS6742G1ZD</span>
        <span style="font-size:13px; font-weight:900; letter-spacing:1px;">TAX INVOICE</span>
        <span>Cell : 99443 56661</span>
      </div>
      <div class="company-name">Hayati Garments</div>
      <div class="company-address">11/4, Sengundhapuram, 5th Street, Mangalam Road, Tirupur – 641 604.</div>
      <div class="company-email">Email: Hayatigarments@gmail.com</div>
    </div>

    <!-- META INFO -->
    <table class="meta-table" style="margin-top:0;">
    <tr>
      <td class="meta-label" style="width:25%;">Invoice No:</td>
      <td class="meta-value" style="width:25%;"><input type="text" placeholder=""></td>
      <td class="meta-label" style="width:25%;">Transport Mode:</td>
      <td><input type="text" placeholder=""></td>
    </tr>
    <tr>
      <td class="meta-label">Invoice Date:</td>
      <td><input type="text" placeholder="DD/MM/YYYY"></td>
      <td class="meta-label">Vehicle Number:</td>
      <td><input type="text" placeholder=""></td>
    </tr>
    <tr>
      <td class="meta-label">Reverse Charge (Y/N):</td>
      <td><input type="text" placeholder=""></td>
      <td class="meta-label">Date of Supply:</td>
      <td><input type="text" placeholder="DD/MM/YYYY"></td>
    </tr>
    <tr>
      <td class="meta-label">State: TAMILNADU</td>
      <td style="font-weight:700;">Code &nbsp;&nbsp;&nbsp; 33</td>
      <td class="meta-label">Place of Supply:</td>
      <td><input type="text" placeholder=""></td>
    </tr>
  </table>


    <!-- BILL TO / SHIP TO -->
    <table>
      <tr class="party-header">
        <th style="width:50%;">Bill to Party</th>
        <th style="width:50%;">Ship to Party</th>
      </tr>
      <tr class="party-table">
        <td style="font-weight:700;">NAME:</td>
        <td style="font-weight:700;">NAME:</td>
      </tr>
      <tr class="party-table party-name-row">
        <td><input type="text" placeholder="" style="height:28px;"></td>
        <td><input type="text" placeholder="" style="height:28px;"></td>
      </tr>
      <tr class="party-table">
        <td>Cell: <input type="text" placeholder="" style="width:80%; display:inline;"></td>
        <td>Cell: <input type="text" placeholder="" style="width:80%; display:inline;"></td>
      </tr>
      <tr class="party-table">
        <td>GSTIN: <input type="text" placeholder="" style="width:75%; display:inline;"></td>
        <td>GSTIN: <input type="text" placeholder="" style="width:75%; display:inline;"></td>
      </tr>
      <tr class="party-table">
        <td>State: <input type="text" placeholder="" style="width:55%; display:inline;"> &nbsp; Code <input type="text"
            placeholder="" style="width:12%; display:inline;"></td>
        <td>State: <input type="text" placeholder="" style="width:50%; display:inline;"> &nbsp; Code <input type="text"
            placeholder="" style="width:12%; display:inline;"></td>
      </tr>
    </table>

    <!-- GOODS TABLE -->
    <table>
      <thead>
        <tr class="goods-header">
          <th style="width:4%;">S.<br>No.</th>
          <th style="width:28%;">Description of Goods</th>
          <th style="width:10%;">HSN/SAC</th>
          <th style="width:6%;">Qty</th>
          <th style="width:10%;">Rate</th>
          <th style="width:17%;">Amount</th>
          <th style="width:12%;">Discount</th>
          <th style="width:13%;">Total</th>
        </tr>
      </thead>
      <tbody id="goodsBody">
        <!-- 10 blank rows -->
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
	<tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
	<tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
	<tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>
        <tr class="goods-row">
          <td></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
          <td><input type="text"></td>
        </tr>

      </tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="2" style="font-weight:900; font-size:12px; padding-left:6px;">Total</td>
          <td></td>
          <td></td>
          <td></td>
          <td><input type="text" id="totalAmount"></td>
          <td><input type="text" id="totalDiscount"></td>
          <td><input type="text" id="grandTotal"></td>
        </tr>
      </tfoot>
    </table>

    <!-- BOTTOM: WORDS + TAX SUMMARY -->
    <table class="bottom-table">
      <tr>
        <td class="words-cell" rowspan="2">
          <span style="font-weight:700; font-size:10.5px;">Total invoice amount in words</span><br><br>
          <input type="text" placeholder="" style="width:100%; font-size:10.5px; margin-top:4px;">
        </td>
        <td class="tax-label" style="width:28%;">Total amount before Tax</td>
        <td class="tax-value"><input type="text" style="width:100%;"></td>
      </tr>
      <tr>
        <td class="tax-label">CGST</td>
        <td class="tax-value"><input type="text" style="width:100%;"></td>
      </tr>
      <tr>
        <td rowspan="5" style="vertical-align:top; padding:0;">
          <div class="bank-section">
            <h4>Bank Details</h4>
            <p>Bank &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : City Union Bank</p>
            <p>Account No &nbsp;: 510909010241490</p>
            <p>IFSC CODE &nbsp; : CIUB0000066</p>
            <p>Branch &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : Tiruppur</p>
          </div>
        </td>
        <td class="tax-label">SGST</td>
        <td class="tax-value"><input type="text" style="width:100%;"></td>
      </tr>
      <tr>
        <td class="tax-label">IGST</td>
        <td class="tax-value"><input type="text" style="width:100%;"></td>
      </tr>
      <tr>
        <td class="tax-label">Round off</td>
        <td class="tax-value"><input type="text" style="width:100%;"></td>
      </tr>
      <tr>
        <td class="tax-label">Total amount after Tax</td>
        <td class="tax-value"><input type="text" style="width:100%;"></td>
      </tr>
      <tr>
        <td class="tax-label">Total Amount</td>
        <td class="tax-value"><input type="text" style="width:100%;"></td>
      </tr>
      <tr>
        <td rowspan="2" style="vertical-align:top; padding:0;">
          <div class="terms-cell">
            <h4>Terms &amp; Conditions</h4>
          </div>
        </td>
        <td class="tax-label">Gst on Reverse Charge</td>
        <td class="tax-value"><input type="text" style="width:100%;"></td>
      </tr>
      <tr>
        <td class="eo-cell" colspan="2">E &amp; O.E</td>
      </tr>
    </table>

    <!-- DECLARATION + SIGNATORY -->
    <table>
      <tr>
        <td style="width:55%; vertical-align:top; padding:5px;">
          <div class="declaration">
            <span>Declaration</span>
            <p>We Declare that this invoice shows the actual price of the goods described and<br>that all particulars
              are true and correct</p>
          </div>
        </td>
        <td class="signatory-cell" style="width:45%;">
          <div class="for-text">For Hayati Garments</div>
          <div class="auth-text">Authorised signatory</div>
        </td>
      </tr>
    </table>

    <!-- FOOTER -->
    <div class="footer-text">SUBJECT TO TIRUPPUR JURISTICATION</div>

  </div>

  <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>

</body>

</html>





  `;
