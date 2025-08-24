@if($isPassword)
Ini adalah password terbaru Anda <strong>{{ $pesan }}</strong>.
Silakan untuk mengubah password tersebut setelah Anda login.
@else
{{ $pesan }}
@endif