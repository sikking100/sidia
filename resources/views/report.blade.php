<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Users Report</title>
    <style>
        .column1 {
          float: left;
          width: 30%;
        }

        .column2 {
                  float: left;
                  width: 70%;
                }

        /* Clear floats after the columns */
        .row:after {
          content: "";
          display: table;
          clear: both;
        }
        table, th, td {
          border: 1px solid;
          padding: 5px;
        }

        .mt {
            margin-top: 2rem;
        }
    </style>
</head>
<body>
    <div>
        <img src="{{ public_path('assets/kop.png') }}" style="height: 6.2rem; display: block; margin-left: auto; margin-right: auto;" />
    </div>
    <div class="mt">
        <b style="display: block; margin-left: auto; margin-right: auto; font-size: 16px; text-align: center;">LEMBAR PENGINPUTAN PENGAJUAN {{$application->category}}</b>
    </div>
    <div>
        <b style="display: block; margin-left: auto; margin-right: auto; font-size: 16px; text-align: center;">{{ $application->id_card_number }}</b>
    </div>
    <div class="row mt">
        <div class="column1">
            <img src="{{ public_path('storage/images/'.$application->images) }}" style="height: 10rem;"/>
        </div>
        <div class="column2">
        <table style="border-collapse: collapse;">
                <tbody>
                    <tr>
                    <td colspan="3">
                    DATA USER
                    </td>
                    </tr>
                  <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>{{ $application->name }}</td>
                  </tr>
                  <tr>
                      <td>Jenis Kelamin</td>
                      <td>:</td>
                      <td>{{ $application->sex }}</td>
                    </tr>
                    <tr>
                                        <td>ALAMAT</td>
                                        <td>:</td>
                                        <td>{{ $application->district }}, {{ $application->ward }}</td>
                                      </tr>

                  <tr>
                                                          <td>AGAMA</td>
                                                          <td>:</td>
                                                          <td>{{ $application->religion }}</td>
                                                        </tr>
                  <tr>
                    <td>Nomor HP</td>
                    <td>:</td>
                    <td>{{ $application->phone }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{{ $application->email }}</td>
                  </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="mt">
    <table style="border-collapse: collapse; width: 100%;">
        <tr>
            <td>ALASAN PENGAJUAN</td>
        <tr>
        <tr>
            <td>{{ $application->description }}</td>
        <tr>
    </table>
    </div>
    <div class="mt">
        <table style="border-collapse: collapse; width: 100%;">
            <tr>
                <td>LAMPIRAN DOKUMEN</td>
            <tr>
            <tr>
                <td>
                @if ($application->file_id_card != null)
                      <img src="{{ public_path('storage/KTP-Pemula/'. $application->file_id_card) }}" style="width: 50%" />
                    @endif
                    @if ($application->file_family_card != null)
                      <img src="{{ public_path('storage/KTP-Pemula/'. $application->file_family_card) }}" style="width: 50%" />
                    @endif
                    @if ($application->file_lost_letter != null)
                      <img src="{{ public_path('storage/KTP-Pemula/'. $application->file_lost_letter) }}" style="width: 50%" />
                    @endif
                </td>
            <tr>
        </table>
        </div>

</body>
</html>
