<?php

namespace App\Support;

function generateStrongPassword($length = 8)
{
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $password = '';

    // Pastikan minimal 1 huruf dan 1 angka
    $password .= chr(rand(97, 122)); // huruf kecil
    $password .= chr(rand(65, 90));  // huruf besar
    $password .= rand(0, 9);         // angka

    // Tambahkan karakter random untuk sisa panjang
    for ($i = 3; $i < $length; $i++) {
        $password .= $chars[rand(0, strlen($chars) - 1)];
    }

    // Acak lagi susunannya
    return str_shuffle($password);
}
