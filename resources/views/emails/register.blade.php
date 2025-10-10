@if($sender)
Ada permohonan <strong>{{ $application->category }}</strong> dengan nomor Tiket : <strong>{{ $application->ticket }}</strong> dan NIK : <strong>{{ $application->id_card_number }}</strong>. Mohon untuk segera ditindaklanjuti
@else
Permohonan <strong>{{ $application->category }}</strong> dengan nomor Tiket : <strong>{{ $application->ticket }}</strong> telah diregister. Mohon cek email dan website secara berkala untuk mengetahui status permohonan
@endif