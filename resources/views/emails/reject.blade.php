@if($village)
Permohonan {{ $application->category }} dengan Tiket : <strong>{{ $application->ticket }}</strong> dan NIK : <strong>{{ $application->id_card_number }}</strong> telah ditolak. Alasan penolakan : {{ $application->status_description }}
@else
Permohonan dengan Tiket : <strong>{{ $application->ticket }}</strong> dan NIK : <strong>{{ $application->id_card_number }}</strong> telah ditolak. Alasan penolakan : {{ $application->status_description }}
@endif