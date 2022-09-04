<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Users Report</title>
    <style>
        table {
          /* width: 100%; */
          overflow-wrap: break-word;
          /* table-layout: fixed; */
        }
        table, td {
          /* width: 100%; */
          border: solid 2px;
          border-collapse: collapse;
          padding: 0.1em 0.5em 0.1em 0.5em;
        }

        .borders {
          border: solid 1px;
          padding: 0.1em;
        }
        .h1 {
          margin-block-end: 0em;
          font-size: 1.5em;
          text-align: center;
          font-weight: bold;
          display: block;
        }
        .h2 {
          display: block;
          margin-block-start: 0em;
          margin-block-end: 0em;
          font-size: 1.45em;
          text-align: center;
          font-weight: bold;
        }
        .h3 {
          display: block;
          font-weight: bold;
          font-size: 1em;
          margin-block-end: 0em;
          margin-block-start: 0em;
          text-align: center;
        }
        .alamat {
          display: block;
          font-style: italic;
          margin-block-start: 0em;
          font-size: 1.07em;
          text-align: center;
        }
    </style>
</head>
<body>
  <div class="borders">
    <table>

      <tr>
        <td style="width: 0px">
          <img src="{{ public_path('assets/logo.png') }}" style="height: 6.2rem; display: block; margin-left: auto; margin-right: auto;" />
        </td>
        <td colspan="5" style="width: 100%">
          <span class="h1">PEMERINTAH KABUPATEN MOROWALI UTARA</span>
          <span class="h2">DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL</span>
          <span class="alamat">Alamat :Komspanleks Perkantoran Jl. Bumi Nangka Kolonodale KodePos : 94971</span>
        </td>
      </tr>
      <tr>
        <td rowspan="2">
          <span class="h3" style="text-align: center;">{{ $application->id }}</span>
        </td>
        <td colspan="5" style="width: 100%">
          <span class="h3">LEMBAR PENGINPUTAN PENGAJUAN {{ $application->category }}</span>
        </td>
      </tr>
      <tr>
        <td colspan="5" style="width: 100%">
          <span class="h3">NIK. {{ $application->id_card_number }}</span>
        </td>
      </tr>
      <tr>
        <td colspan="6" style="width: 100%">
          <br>
        </td>
      </tr>
      <tr>
        <td colspan="6" style="width: 100%">
          <span class="h3">DATA PEMOHON</span>
        </td>
      </tr>
      <tr>
        <td rowspan="9" colspan="2">
          <img src="{{ public_path('storage/images/'.$application->images) }}" style="width: 8em;"/>
        </td>
        <td rowspan="9" style="width: 0px;">
        </td>
        <td>
          No.KK
        </td>
        <td style="width: 0px;">
          :
        </td>
        <td style="width: 50%">
          {{ $application->family_card_number }}
        </td>
      </tr>
      <tr>
        <td>
          Nama Kepala Keluarga
        </td>
        <td>
          :
        </td>
        <td >
          {{ $application->family_head_name }}
        </td>
      </tr>
      <tr>
        <td>
          Nama Lengkap Pemohon
        </td>
        <td>
          :
        </td>
        <td >
          {{ $application->name }}
        </td>
      </tr>
      <tr>
        <td>
          Jenis Kelamin
        </td>
        <td>
          :
        </td>
        <td >
          {{ $application->sex }}
        </td>
      </tr>
      <tr>
        <td>
          Kecamatan
        </td>
        <td>
          :
        </td>
        <td >
          {{ $application->district }}
        </td>
      </tr>
      <tr>
        <td>
          Kelurahan / Desa
        </td>
        <td>
          :
        </td>
        <td >
          {{ $application->ward }}
        </td>
      </tr>
      <tr>
        <td>
          Agama
        </td>
        <td>
          :
        </td>
        <td >
          {{ $application->religion }}
        </td>
      </tr>
      <tr>
        <td>
          No. HP
        </td>
        <td>
          :
        </td>
        <td >
          {{ $application->phone }}
        </td>
      </tr>
      <tr>
        <td>
          Email
        </td>
        <td>
          :
        </td>
        <td >
          {{ $application->email }}
        </td>
      </tr>
      <tr>
        <td colspan="6">
          <br>
        </td>
      </tr>
      <tr>
        <td colspan="6">
          <span class="h3">LAMPIRAN DOKUMEN</span>
        </td>
      </tr>
      <tr>
        <td colspan="6">
          @foreach ($application->files as $file)
            {{ $file->name }}<br>
            <img src="{{ public_path('storage/' . $file->place) }}" style="width: 50%" /><br><br>
            <br>
          @endforeach
        </td>
      </tr>
      <tr>
        <td colspan="6">
          <br>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <span class="h3">ALASAN PENGAJUAN</span>
        </td>
        <td>
        </td>
        <td >
          <span class="h3">PARAF VERIFIKASI</span>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <span class="h3">{{ $application->description }}</span>
        </td>
        <td>
        </td>
        <td >
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
        </td>
      </tr>
      <tr>
        <td colspan="6">
          <br>
        </td>
      </tr>
      <tr>
        <td colspan="2" >
          <span class="h3">PARAF PENGINPUTAN</span>
        </td>
        <td colspan="2" >
          <span class="h3">PARAF CETAK</span>
        </td>
        <td>
        </td>
        <td >
          <span class="h3">TANDA TANGAN PENGAMBILAN DOKUMEN</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" >
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
        </td>
        <td colspan="2" >
        </td>
        <td>
        </td>
        <td >
        </td>
      </tr>
      <tr>
        <td colspan="6">
          <br>
        </td>
      </tr>
      <tr>
        <td colspan="4">
          <p style="text-align: center; font-style: italic;">sidia.dukcapil.morowalikab.go.id</p>
        </td>

        <td>
        </td>
        <td >
          <p style="text-align: center;">{{ date('d M Y') }}</p>
        </td>
      </tr>
      <tr>
        <td colspan="6">
          <br>

        </td>
      </tr>
    </table>
  </div>
</body>
</html>
