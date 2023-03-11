-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 11, 2023 at 10:33 AM
-- Server version: 10.5.19-MariaDB-cll-lve
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u1712428_sidia`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_card_number` varchar(20) NOT NULL,
  `family_card_number` varchar(20) NOT NULL,
  `family_head_name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sex` enum('L','P') NOT NULL,
  `religion` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `ward` varchar(255) NOT NULL,
  `images` text NOT NULL,
  `description` text DEFAULT NULL,
  `problems` text DEFAULT NULL,
  `status` enum('PENDING','DEFFICIENT','VERIFIED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `status_description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `id_card_number`, `family_card_number`, `family_head_name`, `category`, `name`, `phone`, `email`, `sex`, `religion`, `district`, `ward`, `images`, `description`, `problems`, `status`, `status_description`, `created_at`, `updated_at`) VALUES
(4, '7206133103960001', '7212090402220002', 'KADEK SUARTIKA', 'KIA-Baru', 'SUWONDO', '085280694216', NULL, 'L', 'Islam', 'MAMOSALATO', 'GIRIMULYA', '1666233123.jpg', 'Pembuatan KIA Baru', NULL, 'VERIFIED', 'ok', '2022-10-19 19:32:03', '2022-11-30 01:25:30'),
(5, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Baru', 'Marharlen pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1666838530.jpg', 'Kk baru dengan pengurangan anggota keluarga an.delvia praharyati pasau karena sudah menikah', NULL, 'COMPLETED', 'Selesai', '2022-10-26 19:42:10', '2022-11-30 00:51:48'),
(6, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Marharlen pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1667239112.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'sudah terproses di pengajuan pertama', '2022-10-31 10:58:32', '2022-11-30 01:00:09'),
(8, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Marharlen pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1667239140.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'VERIFIED', 'berkas tidak di lampirkan', '2022-10-31 10:59:00', '2022-11-30 01:35:57'),
(9, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Marharlen pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1667239146.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'COMPLETED', 'Selesai', '2022-10-31 10:59:06', '2022-11-30 01:36:43'),
(10, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239461.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'COMPLETED', 'Selesai', '2022-10-31 11:04:21', '2022-11-30 01:36:10'),
(11, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239484.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'VERIFIED', 'berkas tidak di lampirkan', '2022-10-31 11:04:44', '2022-11-30 01:37:13'),
(13, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239498.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'VERIFIED', 'berkas tidak di lampirkan', '2022-10-31 11:04:58', '2022-11-30 01:38:14'),
(14, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239504.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak di lampirkan', '2022-10-31 11:05:04', '2022-11-30 01:38:31'),
(15, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239547.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak di lampirkan', '2022-10-31 11:05:47', '2022-11-30 01:38:53'),
(16, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239554.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak di lampirkan', '2022-10-31 11:05:54', '2022-11-30 01:39:15'),
(17, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239560.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak di lampirkan', '2022-10-31 11:06:00', '2022-11-30 01:39:37'),
(18, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239567.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak di lampirkan', '2022-10-31 11:06:07', '2022-11-30 01:39:58'),
(19, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239574.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak dilampirkan', '2022-10-31 11:06:14', '2022-11-30 01:40:24'),
(20, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239581.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak di lampirkan', '2022-10-31 11:06:21', '2022-11-30 01:40:44'),
(21, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239619.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'VERIFIED', 'lampirkan berkas,tks', '2022-10-31 11:06:59', '2022-11-30 01:41:46'),
(22, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239626.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'lampirkan berkas', '2022-10-31 11:07:07', '2022-11-30 01:44:45'),
(23, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239633.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'lampirkan berkas,tks', '2022-10-31 11:07:13', '2022-11-30 01:45:06'),
(24, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239639.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'lampirkan berkas', '2022-10-31 11:07:19', '2022-11-30 01:45:32'),
(25, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239665.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak lengkap', '2022-10-31 11:07:45', '2022-11-30 01:46:09'),
(26, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239673.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak lengkap', '2022-10-31 11:07:53', '2022-11-30 01:46:38'),
(27, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239679.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak lengkap', '2022-10-31 11:07:59', '2022-11-30 01:46:56'),
(28, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239693.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak lengkap.tks', '2022-10-31 11:08:13', '2022-11-30 01:47:16'),
(29, '7206011307930001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Dirgah yulitha pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'P', 'Protestan', 'MORI UTARA', 'PELERU', '1667239729.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak lengkap', '2022-10-31 11:08:49', '2022-11-30 01:47:35'),
(30, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Marharlen pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1667239795.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'COMPLETED', 'Selesai', '2022-10-31 11:09:55', '2022-11-30 01:48:56'),
(31, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Marharlen pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1667239804.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'VERIFIED', 'berkas tidak di sertakan', '2022-10-31 11:10:04', '2022-11-30 01:51:15'),
(32, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Marharlen pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1667239815.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak di lampirkan', '2022-10-31 11:10:15', '2022-11-30 01:52:00'),
(33, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Perubahan-Data', 'Marharlen pasau', '082259047725', 'Pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1667239838.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'berkas tidak dilampirkan', '2022-10-31 11:10:38', '2022-11-30 01:52:46'),
(34, '7206010303690001', '7206011803082055', 'Marharlen pasau', 'KK-Baru', 'Marharlen pasau', '082259047725', 'pasaudirgahyulitha@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'PELERU', '1667239956.jpg', 'Pengurangan anggota keluarga karena sudah menikah', NULL, 'DEFFICIENT', 'permintaan 2x atas kk yang sama', '2022-10-31 11:12:36', '2022-11-30 01:57:56'),
(35, '7206010711820001', '7206011803083161', 'Ernamin lamedo', 'Kematian', 'Nelan Tumani', '082346845980', 'sultantanonggi@gmail.com', 'L', 'Protestan', 'MORI UTARA', 'TIWA\'A', '1667447278.jpg', 'Pembuatan akta kematian', NULL, 'DEFFICIENT', 'harapkan lampirkan berkas sesuai permintaan di sytem,kk suket kematian dari desa/kelurahan', '2022-11-02 20:47:58', '2022-11-30 02:00:08'),
(36, '7206012505670001', '7206010507120008', 'ECI MANGILAA', 'KK-Baru', 'MEIBER TAMIN AMBETA', '082281713655', 'tamaambeta5@gmai.com', 'L', 'Protestan', 'MORI UTARA', 'TIWA\'A', '1667447717.jpg', 'Ganti KK Siak', NULL, 'DEFFICIENT', 'Fhoto kk tidak terbaca', '2022-11-02 20:55:17', '2022-11-30 02:00:57'),
(37, '7206016004430001', '7206011803083103', 'ROKU NTJALI', 'KK-Rusak', 'ROKU NTJALI', '0823445927978', NULL, 'L', 'Protestan', 'MORI UTARA', 'TAMONJENGI', '1668043756.jpg', 'Permohonan perubahan KK TTD manual menjadi KK yang menggunakan kode Barkon', NULL, 'VERIFIED', 'ok', '2022-11-09 18:29:17', '2022-11-30 19:10:43'),
(38, '7206044107020010', '7206041803080907', 'ASRAN BIRA', 'KK-Baru', 'SEPRIAWATI', '082239028665', '082255159588@gmail.com', 'P', 'Protestan', 'BUNGKU UTARA', 'OPO', '1668380372.jpg', 'permohonan percetakan KK  Rumah tangga baru', NULL, 'DEFFICIENT', 'lampirkan surat nikah dari capil/KUA UNTUK DASAR PENYATUAN KK', '2022-11-13 15:59:32', '2022-11-30 02:18:54'),
(39, '7206044107020010', '7206041803080907', 'ASRAN BIRA', 'KK-Baru', 'SEPRIAWATI', '082239028665', '082255159588@gmail.com', 'P', 'Protestan', 'BUNGKU UTARA', 'OPO', '1668871579.jpg', NULL, NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2022-11-19 08:26:19', '2022-11-19 08:26:19'),
(40, '7206012610850001', '7212051205160004', 'YONATAN WALILIOMPA', 'Akta-Kelahiran-Baru', 'YONATAN WALILIOMPA', '082346683054', 'saemba2017@gmail.com', 'L', 'Protestan', 'MORI ATAS', 'SAEMBA', '1669255907.jpg', 'PEMBUATAN AKTA KELAHIRAN ANAK KE 2 AN. JESSIE JUANITA WALILIOMPA', NULL, 'DEFFICIENT', 'Berkas tidak lengkap,lampirkan suket kelahiran atas nama jessie juanita waliliompa,untuk dasar sytem imput di di kartu keluarga,mohon lampirkan akta nikah capil jika ada,tks', '2022-11-23 19:11:47', '2022-11-30 18:12:13'),
(41, '7206011307930001', '7206011803081920', 'Arbing pangala', 'KK-Hilang', 'Dirgah yulitha pasau', '082259047725', 'dirgahdjulithapasau@gmail.com', 'L', 'Islam', 'MORI UTARA', 'PELERU', '1670500820.jpg', 'Kartu keluarga lama hilang', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2022-12-08 05:00:20', '2022-12-08 05:00:20'),
(42, '7202041712890006', '71212011307180003', 'Marco sanjaya sangkalia', 'KTP-Hilang', 'Marco sanjaya sangkalia', '085342995524', 'marcosanjaya99@gmail.com', 'L', 'Protestan', 'PETASIA', 'KEL.BAHONTULA', '1673756852.jpg', 'Ktp dan kk saya d tahan d dukcapil poso.', NULL, 'DEFFICIENT', 'harap lampirkan surat nikah dari capil,kk dan ktp  masing2 ,suami istri.tks', '2023-01-14 21:27:33', '2023-01-17 17:54:00'),
(43, '7202041712890006', '71212011307180003', 'Marco sanjaya sangkalia', 'KK-Perubahan-Data', 'Marco sanjaya sangkalia', '085342995524', 'marcosanjaya99@gmail.com', 'L', 'Protestan', 'PETASIA', 'KEL.BAHONTULA', '1674014186.jpg', 'Ubah status perkawinan', NULL, 'COMPLETED', 'Selesai', '2023-01-17 20:56:26', '2023-01-23 19:16:31'),
(44, '7202041712890006', '71212011307180003', 'Marco sanjaya sangkalia', 'KK-Perubahan-Data', 'Marco sanjaya sangkalia', '085342995524', 'marcosanjaya99@gmail.com', 'L', 'Protestan', 'PETASIA', 'KEL.BAHONTULA', '1674014229.jpg', 'Ubah status perkawinan', NULL, 'COMPLETED', 'Selesai', '2023-01-17 20:57:09', '2023-01-23 19:17:50'),
(55, '7202041712890006', '71212011307180003', 'Marco sanjaya sangkalia', 'KK-Perubahan-Data', 'Marco sanjaya sangkalia', '085342995524', 'marcosanjaya99@gmail.com', 'L', 'Protestan', 'PETASIA', 'KEL.BAHONTULA', '1674018508.jpg', NULL, NULL, 'COMPLETED', 'Selesai', '2023-01-17 22:08:28', '2023-01-23 19:15:39'),
(58, '7206035112000001', '7206031803084942', 'Alex lambo', 'KTP-Perubahan', 'Desinta  lambo', '082248586812', 'desintalambo25@gmail.com', 'P', 'Protestan', 'PETASIA TIMUR', 'MOLORES', '1674088403.jpg', 'Merubah,kk dan  ktp sesuai ijazah', NULL, 'VERIFIED', 'berkas sudah terproses', '2023-01-18 17:33:23', '2023-01-23 19:12:29'),
(72, '7206021404920002', '7212040210170005', 'Wildan Hasyim Amin', 'KTP-Perubahan', 'Wildan Hasyim Amin', '085241106103', 'wildanhasyimamin@gmail.com', 'L', 'Islam', 'LEMBO', 'KOROBONDE', '1674569347.png', 'Perubahan Jenis Pekerjaan', NULL, 'VERIFIED', 'ok,japrikan sk pns k 081348752003', '2023-01-24 07:09:07', '2023-01-24 20:54:53'),
(73, '7206021404920002', '7212040210170005', 'Wildan Hasyim Amin', 'KK-Perubahan-Data', 'Wildan Hasyim Amin', '085241106103', 'wildanhasyimamin@gmail.com', 'L', 'Islam', 'LEMBO', 'KOROBONDE', '1674569840.png', 'Perubahan Jenis Pekerjaan Kepala Keluarga menjadi PNS\r\nPerubahan Jenis Pekerjaan Istri menjadi Honorer\r\nPerubahan Pendidikan Anak, masih sekolah', NULL, 'COMPLETED', 'Selesai', '2023-01-24 07:17:20', '2023-01-26 23:13:01'),
(74, '7206041707790001', '7206041803081457', 'SUDIN', 'KK-Baru', 'MUSA SAIROEN', '085241170775', 'musasairoen135768@gmail.com', 'L', 'Protestan', 'BUNGKU UTARA', 'UEMPANAPA', '1674704181.jpg', 'Pindahan dari Desa Salubiro', NULL, 'DEFFICIENT', 'tampilkan wajah pemohon,nik dan kk pemohon yg akan pindah,foto kk lama desa salubiru,formulir kk dr desa uempanapa dgn suami,lampirkan surat nikah dari kua/capil/dari Gereja untuk dasar penyatuan dengan pasangan,dan kk suami', '2023-01-25 20:36:21', '2023-01-26 23:12:48'),
(75, '7318274303980001', '737182280507039', 'Martinus bimbing', 'KK-Baru', 'Arlin palala\'ngan', '0822102257294', NULL, 'P', 'Protestan', 'PETASIA TIMUR', 'TOMPIRA', '1675063884.jpg', 'Pindah datang', NULL, 'COMPLETED', 'Selesai', '2023-01-30 00:31:24', '2023-01-30 00:55:03'),
(80, '7371095910900001', '7212042903220002', 'DZukurllah toadji', 'KK-Perubahan-Data', 'Nurul ulfa haerani', '081355191703', NULL, 'P', 'Islam', 'PETASIA BARAT', 'TIU', '1675137908.jpg', 'Penambahan anak', NULL, 'COMPLETED', 'Selesai', '2023-01-30 21:05:08', '2023-01-30 21:08:13'),
(81, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'KTP-Perubahan', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675299271.jpg', 'Dalam pengurusan pindah penduduk dari Morowali Utara pindah ke Kalimantan timur', NULL, 'COMPLETED', 'Selesai', '2023-02-01 17:54:32', '2023-02-16 19:36:08'),
(82, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675300324.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan timur', NULL, 'DEFFICIENT', 'berkas dan alamat tujuan blm terupload semua', '2023-02-01 18:12:04', '2023-02-01 22:46:10'),
(83, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675300342.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan timur', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 18:12:22', '2023-02-01 18:12:22'),
(84, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675300374.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan timur', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 18:12:54', '2023-02-01 18:12:54'),
(86, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675302029.jpg', 'Pengurusan pindah penduduk dari morowali Utara pindah ke Kalimantan timur', NULL, 'DEFFICIENT', 'fhoto dan berkas tidk lengkap', '2023-02-01 18:40:29', '2023-02-01 19:28:15'),
(87, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675302037.jpg', 'Pengurusan pindah penduduk dari morowali Utara pindah ke Kalimantan timur', NULL, 'DEFFICIENT', 'fhoto tidak jelas', '2023-02-01 18:40:37', '2023-02-01 19:27:38'),
(90, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675304878.jpg', 'Pindah Data ke Provinsi Sulawesi Utara, \r\nkabupaten: minahasa,\r\nkecamatan: mandolang\r\nDesa: Tateli weru\r\nDusun: 4', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 19:27:59', '2023-02-01 19:27:59'),
(91, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675304904.jpg', 'Pindah Data ke Provinsi Sulawesi Utara, \r\nkabupaten: minahasa,\r\nkecamatan: mandolang\r\nDesa: Tateli weru\r\nDusun: 4', NULL, 'DEFFICIENT', 'berkas tidak lengkap', '2023-02-01 19:28:25', '2023-02-28 19:35:05'),
(93, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675305248.jpg', 'Pindah data ke Sulawesi utara\r\nProvinsi minahasa\r\nKecamatan: mandolang \r\nDesa tateli weru\r\nDusun: 4', NULL, 'DEFFICIENT', 'skpwni sudah di email', '2023-02-01 19:34:08', '2023-02-28 19:39:03'),
(94, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675305259.jpg', 'Pindah data ke Sulawesi utara\r\nProvinsi minahasa\r\nKecamatan: mandolang \r\nDesa tateli weru\r\nDusun: 4', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 19:34:19', '2023-02-01 19:34:19'),
(95, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675305284.jpg', 'Pindah data ke Sulawesi utara\r\nProvinsi minahasa\r\nKecamatan: mandolang \r\nDesa tateli weru\r\nDusun: 4', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 19:34:44', '2023-02-01 19:34:44'),
(96, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675308249.jpg', 'Keperluan: \r\nPindah data ke provinsi Sulawesi utara\r\nKabupaten minahasa\r\nKecamatan: mandolamg\r\nDesa: tateli weru\r\nDusun 4', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 20:24:09', '2023-02-01 20:24:09'),
(97, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675308314.jpg', 'Keperluan: \r\nPindah data ke provinsi Sulawesi utara\r\nKabupaten minahasa\r\nKecamatan: mandolamg\r\nDesa: tateli weru\r\nDusun 4', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 20:25:14', '2023-02-01 20:25:14'),
(98, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675309120.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan Timur', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 20:38:41', '2023-02-01 20:38:41'),
(99, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675309130.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan Timur', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 20:38:50', '2023-02-01 20:38:50'),
(100, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675309143.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan Timur', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 20:39:04', '2023-02-01 20:39:04'),
(101, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675309158.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan Timur', NULL, 'DEFFICIENT', 'sudah d proses', '2023-02-01 20:39:19', '2023-02-16 19:36:50'),
(102, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675309200.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan Timur', NULL, 'DEFFICIENT', 'sudah terproses', '2023-02-01 20:40:01', '2023-02-16 19:37:10'),
(103, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675309392.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan Timur', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-01 20:43:12', '2023-02-01 20:43:12'),
(109, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675317494.jpg', 'Pindah wilayah ke Sulawesi utara\r\nKabupaten minahasa desa tateli weru\r\nDusun 4', NULL, 'COMPLETED', 'Selesai', '2023-02-01 22:58:14', '2023-03-01 17:32:31'),
(110, '7171095308910002', '7212031106210004', 'Lidyanita Madonsa', 'SKPWNI-Pindah-Keluar', 'Lidyanita Madonsa', '082296557175', 'madonsa55@gmail.com', 'P', 'Protestan', 'LEMBO RAYA', 'DOLUPO KARYA', '1675318472.jpg', 'Pindah wilayah ke Sulawesi utara\r\nKabupaten minhasa kecamatan mandolang desa tateli weru\r\nDusun 4', NULL, 'COMPLETED', 'Selesai', '2023-02-01 23:14:32', '2023-02-01 23:23:38'),
(111, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675341408.jpg', 'Pindah penduduk dari Morowali Utara ke Kalimantan Timur PT', NULL, 'COMPLETED', 'Selesai', '2023-02-02 05:36:48', '2023-02-02 23:36:41'),
(112, '7318291112860002', '7212021412210002', 'SETIAWAN PARTO BULI', 'SKPWNI-Pindah-Keluar', 'SETIAWAN PARTO BULI', '082346829831', 'setiawanbuli9322@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675341836.jpg', 'Pengurusan pindah penduduk dari Morowali Utara ke Kalimantan Timur', NULL, 'COMPLETED', 'Selesai', '2023-02-02 05:43:56', '2023-02-02 23:36:50'),
(113, '7212021811180001', '7212022002200005', 'Ahmad Mujahid', 'KK-Baru', 'Muhamad Husain', '082310110953', 'attazmi70@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1675445410.jpg', 'untuk permintaan data pendukung', NULL, 'DEFFICIENT', 'lengkapi berkas pendukung dan jenis keperluanya pembuatan kk,tks', '2023-02-03 10:30:10', '2023-02-05 19:35:23'),
(115, '7324052501840001', '7212021303190005', 'hayyinukman', 'Akta-Kelahiran-Perubahan', 'hayyinukman', '082310110953', 'attazmi70@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1675674435.jpg', 'update akta kelahiran anak berbarcode dikarenakan sekolahnya minta akta yang ber barcode', NULL, 'COMPLETED', 'Selesai', '2023-02-06 02:07:15', '2023-02-10 00:34:53'),
(116, '7206032606970002', '7212021910220011', 'Ahmad Hamzah Zulfikri', 'KK-Perubahan-Data', 'Ahmad Hamzah Zulfikri', '082310110953', 'fikri26massen@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1675733564.jpg', 'kesalahan jenis kelamin dan tempat lahir', NULL, 'PENDING', 'Mohon cek secara berkala, sementara permohonan Anda sedang diverifikasi', '2023-02-06 18:32:44', '2023-02-06 18:32:44'),
(117, '7318192305820002', '7212050905160004', 'Fitmaryanto', 'SKPWNI-Pindah-Keluar', 'Fitmaryanto', '082215030902', NULL, 'L', 'Protestan', 'MORI ATAS', 'SAEMBA WALATI', '1675839172.jpg', NULL, NULL, 'COMPLETED', 'Selesai', '2023-02-07 23:52:52', '2023-02-08 00:00:54'),
(118, '7318295012960001', '7212022501220017', 'Krismayani Luku', 'KK-Hilang', 'Krismayani Luku', '082260234413', 'krismayaniluku852@gmail.com', 'P', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675842309.jpg', 'Kartu keluarga hilang', NULL, 'DEFFICIENT', 'dauble berkas', '2023-02-08 00:45:09', '2023-02-09 23:12:53'),
(119, '7318122212940001', '7212020903220022', 'Yonathan', 'SKPWNI-Pindah-Keluar', 'Yonathan', '082320422276', 'fritzyrjonathan@gmail.com', 'L', 'Katolik', 'PETASIA TIMUR', 'BUNTA', '1675855599.jpg', 'Pekerjaan', NULL, 'DEFFICIENT', 'berkas tdk lengkap', '2023-02-08 04:26:39', '2023-02-09 23:13:12'),
(120, '7318122212940001', '7212020903220022', 'Yonathan', 'SKPWNI-Pindah-Keluar', 'Yonathan', '082320422276', 'fritzyrjonathan@gmail.com', 'L', 'Katolik', 'PETASIA TIMUR', 'BUNTA', '1675897230.jpg', 'Pekerjaan', NULL, 'DEFFICIENT', 'berkas tidak lengkap', '2023-02-08 16:00:31', '2023-02-09 23:13:36'),
(121, '7318122212940001', '7212020903220022', 'Yonathan', 'SKPWNI-Pindah-Keluar', 'Yonathan', '082320422276', 'fritzyrjonathan@gmail.com', 'L', 'Katolik', 'PETASIA TIMUR', 'BUNTA', '1675897480.jpg', 'Pekerjaan', NULL, 'DEFFICIENT', 'lengkapi persyaratan,upload photo wajah pegang berkas kk dan ktp asli,upload kk asli d kolom upload,upload ktp asli d kolom upload,upload alamat tujuan dan tuliskan alamat tjuan pindah prov,kab,kec,keluarahan/desa,tks', '2023-02-08 16:04:40', '2023-02-09 23:16:30'),
(122, '7318295012960001', '721202250122001', 'Krismayani Luku', 'KK-Hilang', 'Krismayani Luku', '082260234413', 'krismayaniluku852@gmail.com', 'P', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1675911447.jpg', 'KK hilang dan mau urus KK asli kembali', NULL, 'COMPLETED', 'Selesai', '2023-02-08 19:57:27', '2023-02-09 20:59:40'),
(123, '7318122212940001', '7212020903220022', 'Yonathan', 'SKPWNI-Pindah-Keluar', 'Yonathan', '082320422276', 'fritzyrjonathan@gmail.com', 'L', 'Katolik', 'PETASIA TIMUR', 'BUNTA', '1676244449.jpg', 'Pekerjaan', NULL, 'COMPLETED', 'Selesai', '2023-02-12 16:27:29', '2023-02-14 17:49:30'),
(124, '7311032408920001', '7212021109200006', 'Humaini', 'Perkawinan', 'humaini', '082196778605', 'humainiendang@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'BUNTA', '1676342683.jpg', 'cetak akte nikah', NULL, 'DEFFICIENT', 'terkirim ganda.tks', '2023-02-13 19:44:43', '2023-02-13 23:06:41'),
(125, '7311032408920001', '7212021109200006', 'Humaini', 'Perkawinan', 'humaini', '082196778605', 'humainiendang@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'BUNTA', '1676346866.jpg', 'cetak akta nikah', NULL, 'DEFFICIENT', 'setelah uplod fhoto wajah,di kolom upload selanjutnya lampirkan berkas,upload semua di sytem,krn tidak terbaca kalau berkas tdk terupload,\nbuku nikah dr KUA/Capil,,kk  kedua belah pihak,,ktp asli kedua ,formulir kk desa akan berdomusili ,jjgn lupa lampirkan surat pindah salah satu pasangan kalau beda desa/provinsi,tks', '2023-02-13 20:54:26', '2023-02-13 23:05:47'),
(126, '7324052501840001', '7212021303190005', 'hayyinukman', 'Pengaduan-Data-Kependudukan', 'hayyinukman', '082310110953', 'pemerintahdesamolores@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676426229.jpg', 'aktivasi nik, karena setiap validasi dengan data terkait yang muncul data lain.', NULL, 'DEFFICIENT', 'lampirkan ktp el,kk,dan data lain yg muncul atas nama siapa silakan di screenshoot dan  silakan upload ulang berkas', '2023-02-14 18:57:09', '2023-02-15 18:11:05'),
(127, '7324052501840001', '7212021303190005', 'hayyinukman', 'Pengaduan-Data-Kependudukan', 'hayyinukman', '082310110953', 'pemerintahdesamolores@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676426236.jpg', 'aktivasi nik, karena setiap validasi dengan data terkait yang muncul data lain.', NULL, 'DEFFICIENT', 'lengkapi berkas', '2023-02-14 18:57:16', '2023-02-16 19:35:49'),
(128, '7324052501840001', '7212021303190005', 'hayyinukman', 'Pengaduan-Data-Kependudukan', 'hayyinukman', '082310110953', 'pemerintahdesamolores@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676426287.jpg', 'aktivasi nik, karena setiap validasi dengan data terkait yang muncul data lain.', NULL, 'DEFFICIENT', 'lampirkan ktp el,kk,dan data lain yg muncul atas nama siapa silakan di screenshoot dan  silakan upload ulang berkas', '2023-02-14 18:58:07', '2023-02-15 18:11:30'),
(129, '7324052501840001', '7212021303190005', 'hayyinukman', 'Pengaduan-Data-Kependudukan', 'hayyinukman', '082310110953', 'attazmi70@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676426488.jpg', 'aktivasi nik, nik selalu berbeda tempat terdaftarnya', NULL, 'DEFFICIENT', 'lengkapi berkas', '2023-02-14 19:01:28', '2023-02-16 19:34:42'),
(130, '7324052501840001', '7212021303190005', 'hayyinukman', 'Pengaduan-Data-Kependudukan', 'hayyinukman', '082310110953', 'attazmi70@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676426500.jpg', 'aktivasi nik, nik selalu berbeda tempat terdaftarnya', NULL, 'DEFFICIENT', 'lampirkan ktp el,kk,dan data lain yg muncul atas nama siapa silakan di screenshoot dan  silakan upload ulang berkas', '2023-02-14 19:01:40', '2023-02-15 18:12:11'),
(131, '7324052501840001', '7212021303190005', 'hayyinukman', 'Pengaduan-Data-Kependudukan', 'hayyinukman', '082310110953', 'attazmi70@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676426556.jpg', 'aktivasi nik, nik selalu berbeda tempat terdaftarnya', NULL, 'DEFFICIENT', 'lampirkan ktp el,kk,dan data lain yg muncul atas nama siapa silakan di screenshoot dan  silakan upload ulang berkas', '2023-02-14 19:02:36', '2023-02-15 18:12:29'),
(132, '7371130607910010', '9171031805160010', 'Johan Friskilius Nening', 'SKPWNI-Pindah-Keluar', 'Johan Friskilius Nening', '082250816343', 'johan.nening@gmail.com', 'L', 'Katolik', 'LEMBO', 'BETELEME', '1676483774.jpg', 'Ingin Mengajukan Permohonan Surat pindah Keluar Sekeluarga.', NULL, 'DEFFICIENT', 'lengapi berkas sesuai yg di minta,formulir  dan surat pernyataan sudah  dikirim lewat email.tks', '2023-02-15 10:56:14', '2023-02-15 21:35:12'),
(133, '7203126408860002', '7203120904120001', 'M.Arsad', 'KTP-Perubahan', 'Endang Astuti', '082349257797', 'endangacho38@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'TOMPIRA', '1676515032.jpg', 'merubah status kawin menjadi janda', NULL, 'DEFFICIENT', 'lampirkan surat cerai dari pengadilan,atau  jika suami sudah meninggal lampirkan akta kematian dari capil,tks', '2023-02-15 19:37:12', '2023-02-16 00:40:22'),
(134, '7318122212940001', '7212020903220022', 'Yonathan', 'SKPWNI-Pindah-Keluar', 'Yonathan', '082320422276', 'fritzyrjonathan@gmail.com', 'L', 'Katolik', 'PETASIA TIMUR', 'BUNTA', '1676520131.jpg', 'Pekerjaan.', NULL, 'DEFFICIENT', 'cek email,surat pindah sudah di kiirm via email', '2023-02-15 21:02:11', '2023-02-15 21:36:53'),
(135, '7371122208950010', '7212022211220001', 'Muhammad Arfian Bahar', 'SKPWNI-Pindah-Keluar', 'Muhammad Arfian Bahar', '085366336668', 'ianmallata@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'BUNTA', '1676523415.jpg', 'Pekerjaan', NULL, 'DEFFICIENT', 'berkas tidak lengkap,upload dokumen asli,kk,ktp ,lengkapi alamat tujuan prov,kab,kec,kel/desa,dan berfhoto pegang berkas,isi surat pernyatan dan fomulir F1.03 silakan cek email,', '2023-02-15 21:56:55', '2023-02-19 18:23:00'),
(136, '7326074208920002', '7212021710220003', 'AGUSTINA AMAN MARAMPA\'', 'SKPWNI-Pindah-Keluar', 'AGUSTINA AMAN MARAMPA\'', '082291397640', 'aghemarampa@gmail.com', 'P', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1676523678.jpg', 'Pindah, alasan pekerjaaan', NULL, 'VERIFIED', 'lengkapi berkas,upload ulang kk,ktp ,fomulir pindah,surat pernyatan di ttd matrai 10.000.,upload wajah pegang berkas aslimasuk ulang di aplikasi,,tks', '2023-02-15 22:01:18', '2023-02-27 00:24:35'),
(137, '7210084807970001', '7212021502220025', 'EUIS', 'SKPWNI-Pindah-Keluar', 'EUIS', '085824940917', 'euisperomabakrie@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'BUNGINTIMBE', '1676613678.jpg', 'Mau pindah domisili', NULL, 'DEFFICIENT', 'lengkapi berkas,upload wajah pegang dokumen asli,upload,ktp,kk,dan lengkapi alamat sesuai tujuan,isi surat penyataan dan fomulir F1.03.Cek email yg d lampirkan', '2023-02-16 23:01:18', '2023-02-19 18:27:38'),
(138, '7210084807970001', '7212021502220025', 'EUIS', 'SKPWNI-Pindah-Keluar', 'EUIS', '085824940917', 'euisperomabakrie@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'BUNGINTIMBE', '1676614180.jpg', 'Pindah domisili', NULL, 'DEFFICIENT', 'harap lengkapi berkas,upload wajah pegang dokumen asli,isi fomulir dan surat pernyataan silakan cek email ibu fomulir di kirim k email', '2023-02-16 23:09:40', '2023-02-19 18:29:38'),
(139, '7371130607910010', '9171031805160010', 'Johan Friskilius Nening', 'SKPWNI-Pindah-Keluar', 'Johan Friskilius Nening', '082250816343', 'johan.nening@gmail.com', 'L', 'Katolik', 'LEMBO', 'BETELEME', '1676862554.jpg', 'Ingin Mengurus Surat Pindah Keluar', NULL, 'COMPLETED', 'Selesai', '2023-02-19 20:09:14', '2023-02-19 20:51:44'),
(140, '7206032606970002', '7212021910220011', 'AHMAD HAMZAH ZULFIKRI', 'KK-Baru', 'AHMAD HAMZAH ZULFIKRI', '082310110953', 'fikri26massen@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676864478.jpg', 'Pembuatan KK untuk keluarga baru', NULL, 'COMPLETED', 'Selesai', '2023-02-19 20:41:18', '2023-02-20 19:30:39'),
(141, '7371130607910010', '9171031805160010', 'Johan Friskilius Nening', 'SKPWNI-Pindah-Keluar', 'Johan Friskilius Nening', '082250816343', 'johan.nening@gmail.com', 'L', 'Katolik', 'LEMBO', 'BETELEME', '1676865336.jpg', 'Mengajukan Surat Pindah Keluar Penduduk', NULL, 'COMPLETED', 'Selesai', '2023-02-19 20:55:36', '2023-02-20 20:38:28'),
(142, '7206032606970002', '7212021910220011', 'AHMAD HAMZAH ZULFIKRI', 'KK-Baru', 'AHMAD HAMZAH ZULFIKRI', '082310110953', 'fikri26massen@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676947586.jpg', 'pembuatan kk baru', NULL, 'DEFFICIENT', 'nik tidak d temukan,silakan lengkapi berkas,upload kk dan ktp el', '2023-02-20 19:46:26', '2023-02-21 18:37:18'),
(143, '7206032606970002', '7212021910220011', 'AHMAD HAMZAH ZULFIKRI', 'KK-Baru', 'AHMAD HAMZAH ZULFIKRI', '082310110953', 'fikri26massen@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1676949562.jpg', 'kartu keluarga baru', NULL, 'DEFFICIENT', 'lampirkan ktp asli,dan fhoto copi kk,input di sytem nik ybs dan no kk ybs,jgn cuma kk manual untuk mempermudah sytem membaca NIK,ybs', '2023-02-20 20:19:22', '2023-02-20 20:29:01'),
(144, '6472042506940001', '6472043105160003', 'Jemmy sarong allo', 'SKPWNI-Pindah-Keluar', 'Jemmy sarong allo', '081250531448', 'irfanarifian87@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1676959743.jpg', 'Mau buat srt pindah saya dan anak Marvel sarong allo', NULL, 'DEFFICIENT', 'data di luar kab morowali utara,silakandatang ulang  k capil asal di kaltim,tks', '2023-02-20 23:09:03', '2023-02-21 20:25:46'),
(145, '7202060810010005', '7212022411200001', 'Oktopianus Pasawe', 'SKPWNI-Pindah-Keluar', 'Oktopianus Pasawe', '085335823158', 'harrydaud04032001@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1676963597.jpg', 'Pindah Keluar Penduduk', NULL, 'DEFFICIENT', 'data di luar kabupaten morut,ada d poso,tks', '2023-02-21 00:13:17', '2023-02-21 20:29:40'),
(146, '7605032512970001', '7605032403120010', 'MASHUR', 'KK-Baru', 'MULIADI ANWAR', '082310110953', 'pemerintahdesamolores@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1677030847.jpg', 'Pembuatan KK Baru\r\na.n MULIADI ANWAR\r\nNIK : 7605032512970001\r\nNo. KK Sebelumnya : 7605032403120010\r\nKepala Keluarga : Mashur', NULL, 'DEFFICIENT', 'upload dokumen asli dan upload fomulir kk dari desa,,upload skpwni,mohon di fhoto  ulang dgn jelas biar terbaca di sytem ,yg di upload tidak terbaca di sytem,tks', '2023-02-21 18:54:07', '2023-02-22 18:58:41'),
(147, '6472042506940001', '6472043105160003', 'Jemmy sarong allo', 'SKPWNI-Pindah-Keluar', 'Jemmy sarong allo', '081250531448', 'irfanarifian87@gmail.com', 'L', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1677037274.jpg', 'Izin pindah dri morowali Utara kembali ke Samarinda krna data dibawa pindah oleh istri ke Morowali\r\nYang mau pindah  saya Jemmy sarong allo dn anak', NULL, 'DEFFICIENT', 'Data di luar kab morut,silakan datang ulang ke capil asal,tks', '2023-02-21 20:41:14', '2023-02-22 00:45:51'),
(148, '7210084807970001', '7212021502220025', 'EUIS', 'SKPWNI-Pindah-Keluar', 'EUIS', '085824940917', 'euisperomabakrie@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'BUNGINTIMBE', '1677053911.jpg', 'PINDAH PENDUDUK', NULL, 'DEFFICIENT', 'berkas tidak lengkap,upload wajah pegang dokumen asli kk dan ktp morowali utara,upload kk asli morut,ktp asli,surat prnyataan dan fomulir pindah datang,upload semua di sytem,berkas lengkap mempercepat proses antrian di sytem,tks', '2023-02-22 01:18:31', '2023-02-22 18:40:24'),
(149, '7210084807970001', '7212021502220025', 'EUIS', 'SKPWNI-Pindah-Keluar', 'EUIS', '085824940917', 'euisperomabakrie@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'BUNGINTIMBE', '1677056257.jpg', 'Pindah penduduk', NULL, 'DEFFICIENT', 'berkas tidak lengkap,upload wajah pegang dokumen asli kk dan ktp morowali utara,upload kk asli morut,ktp asli,surat prnyataan dan fomulir pindah datang,upload semua di sytem,berkas lengkap mempercepat proses antrian di sytem,tks', '2023-02-22 01:57:37', '2023-02-22 18:40:37'),
(150, '7210084807970001', '7212021502220025', 'EUIS', 'SKPWNI-Pindah-Keluar', 'EUIS', '085824940917', 'euisperomabakrie@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'BUNGINTIMBE', '1677204889.jpg', 'Pindah Penduduk', NULL, 'DEFFICIENT', 'Dauble kirim datanya dan berkas belum lengkap,tks', '2023-02-23 19:14:49', '2023-02-26 19:16:53'),
(151, '7210084807970001', '7212021502220025', 'EUIS', 'SKPWNI-Pindah-Keluar', 'EUIS', '085824940917', 'euisperomabakrie@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'BUNGINTIMBE', '1677205697.jpg', 'Pindah Penduduk', NULL, 'DEFFICIENT', 'upload ulang semua dokumen sesuai panduannya,kk asli,fomulir pindah  dan surat pernyataan yg telah di email di ttd matrai 10.000,ktp asli,kk asli fhoto wajah terbaru pegang berkas,upload semua d kolom upload,via JPEG/JPG,fhoto kuaitas bgus biar terbaca di sytem', '2023-02-23 19:28:17', '2023-02-26 18:49:45'),
(152, '7210084807970001', '7212021502220025', 'EUIS', 'SKPWNI-Pindah-Keluar', 'EUIS', '085824940917', 'euisperomabakrie@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'BUNGINTIMBE', '1677206702.jpg', 'Pindah Penduduk', NULL, 'VERIFIED', 'upload ulang semua berkas,surat pernyataan dan formulir pindah belum d upload,,cek email masuk isi surat pernyataan dan fomulir F.1 03, YANG KAMI  kirim lewat email,belum lengkap berkas tidak bisa d proses,TOLONG CEK EMAIL MASUK LENGKAPI SEMUA BERKAS,\nSemua berkas d upload di sytem,ukuti panduan ini\nupload fhoto wajah pegang berkas,upload kk dan ktp asli,upload surat pernyataan dan formulir pindah yg telah kami kirim ke email ibu  di isi di ttd mengunkan matrai 10.000,MOHON DI LENGKAPI,tks', '2023-02-23 19:45:02', '2023-02-26 17:24:26'),
(153, '7318056604970003', '7212042405210005', 'AYU APRILIA PAEMBONAN', 'SKPWNI-Pindah-Keluar', 'AYU APRILIA PAEMBONAN', '082293021565', 'ayuapriliapaembonan@gmail.com', 'P', 'Islam', 'LEMBO', 'BETELEME', '1677306468.jpg', 'PEKERJAAN', NULL, 'DEFFICIENT', 'berkas tidak terbaca sytem,mohon upload ulang mengunakan format JPG/JPEG,cek email masuk lengkapi formulir,dan surat pernyataan,tks', '2023-02-24 23:27:48', '2023-02-26 17:30:59'),
(154, '7206022409650001', '7212022503210009', 'SOHDIKIN', 'SKPWNI-Pindah-Keluar', 'SOHDIKIN', '082310110953', 'pemerintahdesamolores@gmail.com', 'L', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1677472086.jpg', 'PINDAH TEMPAT TINGGAL KE DESA KOROWOU', NULL, 'DEFFICIENT', 'berkas tidak lengkap,anak dan istri ikut pindah atau tidak?jika tidak sertakan  lengkapi  surat pernyataan perjanjian suami istri bahwa akan pisah kk sesuai kesepakatan,di ttd di atas matrai,dan d stempel,lalu isi formulir kk dr desa asal untuk anak dan istri yg tdk ikut pindah,fhoto wajah asli harus ybs tidak bisa di wakilkan wajah orang lain HARUS DAN WAJIB wajah  suami/istri sambil pegang ktp dan surat pernyataan,SURAT PERNYATAAN CEK DI EMAIL,semua berkas upload ulang di sytem,tks', '2023-02-26 21:28:06', '2023-02-28 00:07:17'),
(155, '7326074208920002', '7212021710220003', 'AGUSTINA AMAN MARAMPA\'', 'SKPWNI-Pindah-Keluar', 'AGUSTINA AMAN MARAMPA\'', '082291397640', 'aghemarampa@gmail.com', 'P', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1677486777.jpg', 'Pekerjaan', NULL, 'COMPLETED', 'Selesai', '2023-02-27 01:32:57', '2023-02-28 18:46:40'),
(156, '7326074208920002', '7212021710220003', 'AGUSTINA AMAN MARAMPA\'', 'SKPWNI-Pindah-Keluar', 'AGUSTINA AMAN MARAMPA\'', '082291397640', 'aghemarampa@gmail.com', 'P', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1677559293.jpg', 'Kepentingan pekerjaan', NULL, 'COMPLETED', 'Selesai', '2023-02-27 21:41:33', '2023-02-27 23:51:16'),
(157, '7326016811880002', '721202510220002', 'Patrisia', 'SKPWNI-Pindah-Keluar', 'patrisia', '085342667516', 'patrisiakadang@gmail.com', 'P', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1677718964.jpg', 'pekerjaan', NULL, 'COMPLETED', 'Selesai', '2023-03-01 18:02:44', '2023-03-05 17:59:26'),
(158, '7326016811880002', '7212022510220002', 'PATRISIA', 'SKPWNI-Pindah-Keluar', 'PATRISIA', '085342667516', 'lpasenggo@gmail.com', 'P', 'Protestan', 'PETASIA TIMUR', 'BUNTA', '1677819884.jpg', 'Pindah penduduk', NULL, 'COMPLETED', 'Selesai', '2023-03-02 22:04:44', '2023-03-06 17:38:52'),
(159, '1275011804980001', '3201032201200020', 'Andre Clinton', 'SKPWNI-Pindah-Keluar', 'Andre Clinton', '082195049828', 'andreclinton773@gmail.com', 'L', 'Katolik', 'LEMBO', 'BETELEME', '1678152102.jpg', 'Untuk mengurus surat pindah untuk berkerja', NULL, 'DEFFICIENT', 'fhoto wajah tidak terbaca di sytem,upload wajah asli pegang berkas ktp dan dan kk,upload surat pernyataan yg ttd matrai 10 rb dan formulir, F.1.03 upload kk dan ktp asli d kolom upload,tks', '2023-03-06 18:21:42', '2023-03-07 20:03:57'),
(160, '1275011804980001', '3201032201200020', 'Andre Clinton', 'SKPWNI-Pindah-Keluar', 'Andre Clinton', '082195049828', 'andreclinton773@gmail.com', 'L', 'Katolik', 'LEMBO', 'BETELEME', '1678153529.jpg', 'Pekerjaan', NULL, 'COMPLETED', 'Selesai', '2023-03-06 18:45:29', '2023-03-10 00:11:46'),
(161, '7206036012530001', '7206031803084782', 'NANDELIA RANDALONGI', 'KK-Baru', 'NANDELIA RANDALONGI', '085340912286', 'pemerintahdesamolores@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1678160869.jpg', 'Update Kartu Keluarga lama Ke kartu keluarga baru yang menggunakan Barcode', NULL, 'COMPLETED', 'Selesai', '2023-03-06 20:47:49', '2023-03-07 20:20:51'),
(162, '7324056007000002', '7324052508090421', 'KAMISI', 'KK-Baru', 'KASMIRA', '082310110953', 'pemerintahdesamolores@gmail.com', 'P', 'Islam', 'PETASIA TIMUR', 'MOLORES', '1678246459.jpg', 'Pindah tinggal dari desa taripa ke desa molores untuk mencari kerja\r\npermintaan Kartu Keluarga Baru dan KTP', NULL, 'COMPLETED', 'Selesai', '2023-03-07 20:34:19', '2023-03-08 22:51:45'),
(163, '1275011804980001', '3201032201200020', 'Andre Clinton', 'SKPWNI-Pindah-Keluar', 'Andre Clinton', '082195049828', 'andreclinton773@gmail.com', 'L', 'Katolik', 'LEMBO', 'BETELEME', '1678341139.jpg', 'Pekerjaan', NULL, 'COMPLETED', 'Selesai', '2023-03-08 22:52:19', '2023-03-10 00:03:42');

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `districts`
--

INSERT INTO `districts` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'PETASIA', '2022-09-29 20:00:03', '2022-09-29 20:00:03'),
(3, 'PETASIA TIMUR', '2022-09-29 20:02:01', '2022-09-29 20:02:01'),
(4, 'PETASIA BARAT', '2022-09-29 20:02:07', '2022-09-29 20:02:07'),
(5, 'LEMBO', '2022-09-29 20:02:13', '2022-09-29 20:02:13'),
(6, 'LEMBO RAYA', '2022-09-29 20:02:18', '2022-09-29 20:02:18'),
(7, 'MORI ATAS', '2022-09-29 20:02:23', '2022-09-29 20:02:23'),
(8, 'MORI UTARA', '2022-09-29 20:02:28', '2022-09-29 20:02:28'),
(9, 'SOYO JAYA', '2022-09-29 20:02:42', '2022-09-29 20:02:42'),
(10, 'BUNGKU UTARA', '2022-09-29 20:02:51', '2022-09-29 20:02:51'),
(11, 'MAMOSALATO', '2022-09-29 20:02:57', '2022-09-29 20:02:57');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `application_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `place` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `application_id`, `name`, `place`, `created_at`, `updated_at`) VALUES
(2, 4, 'Kutipan akta kelahiran', 'KIA-Baru/1666234689.pdf', '2022-10-19 19:58:09', '2022-10-19 19:58:09'),
(3, 4, 'Kartu Keluarga (KK)', 'KIA-Baru/1666234689.pdf', '2022-10-19 19:58:09', '2022-10-19 19:58:09'),
(4, 5, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1666838642.jpg', '2022-10-26 19:44:03', '2022-10-26 19:44:03'),
(5, 5, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1666838654.jpg', '2022-10-26 19:44:15', '2022-10-26 19:44:15'),
(6, 34, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1667240002.jpg', '2022-10-31 11:13:23', '2022-10-31 11:13:23'),
(7, 34, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1667240015.jpg', '2022-10-31 11:13:35', '2022-10-31 11:13:35'),
(8, 34, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1667240035.jpg', '2022-10-31 11:13:55', '2022-10-31 11:13:55'),
(9, 34, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1667240043.jpg', '2022-10-31 11:14:03', '2022-10-31 11:14:03'),
(10, 34, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1667240051.jpg', '2022-10-31 11:14:11', '2022-10-31 11:14:11'),
(11, 34, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1667240057.jpg', '2022-10-31 11:14:18', '2022-10-31 11:14:18'),
(12, 38, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1668381742.jpg', '2022-11-13 16:22:23', '2022-11-13 16:22:23'),
(13, 38, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/1668381743.jpg', '2022-11-13 16:22:23', '2022-11-13 16:22:23'),
(14, 39, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/1668871833.jpg', '2022-11-19 08:30:34', '2022-11-19 08:30:34'),
(15, 39, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/1668871834.jpg', '2022-11-19 08:30:35', '2022-11-19 08:30:35'),
(16, 58, 'Foto KTP-el asli', 'KTP-Perubahan/1674088497.jpg', '2023-01-18 17:34:57', '2023-01-18 17:34:57'),
(17, 58, 'Foto KK Asli', 'KTP-Perubahan/1674088497.jpg', '2023-01-18 17:34:58', '2023-01-18 17:34:58'),
(29, 72, 'Foto KTP-el asli', 'KTP-Perubahan/01674569635.jpg', '2023-01-24 07:13:55', '2023-01-24 07:13:55'),
(30, 72, 'Foto KK Asli', 'KTP-Perubahan/11674569635.jpg', '2023-01-24 07:13:56', '2023-01-24 07:13:56'),
(31, 75, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01675063949.jpg', '2023-01-30 00:32:29', '2023-01-30 00:32:29'),
(32, 75, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11675063949.jpg', '2023-01-30 00:32:29', '2023-01-30 00:32:29'),
(41, 80, 'Foto Ijazah atau berkas data dukung perubahan data lainnya', 'KK-Perubahan-Data/01675137931.png', '2023-01-30 21:05:32', '2023-01-30 21:05:32'),
(42, 80, 'Foto KK Asli', 'KK-Perubahan-Data/11675137932.jpg', '2023-01-30 21:05:32', '2023-01-30 21:05:32'),
(43, 81, 'Foto KTP-el asli', 'KTP-Perubahan/01675299393.jpg', '2023-02-01 17:56:34', '2023-02-01 17:56:34'),
(44, 81, 'Foto KK Asli', 'KTP-Perubahan/11675299394.jpg', '2023-02-01 17:56:35', '2023-02-01 17:56:35'),
(45, 109, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01675317755.jpg', '2023-02-01 23:02:36', '2023-02-01 23:02:36'),
(46, 109, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11675317756.jpg', '2023-02-01 23:02:37', '2023-02-01 23:02:37'),
(47, 109, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21675317757.jpg', '2023-02-01 23:02:38', '2023-02-01 23:02:38'),
(48, 110, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01675318634.jpg', '2023-02-01 23:17:15', '2023-02-01 23:17:15'),
(49, 110, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11675318635.jpg', '2023-02-01 23:17:16', '2023-02-01 23:17:16'),
(50, 110, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21675318636.jpg', '2023-02-01 23:17:17', '2023-02-01 23:17:17'),
(51, 111, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01675341565.jpg', '2023-02-02 05:39:25', '2023-02-02 05:39:25'),
(52, 111, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11675341565.jpg', '2023-02-02 05:39:25', '2023-02-02 05:39:25'),
(53, 111, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21675341565.jpg', '2023-02-02 05:39:26', '2023-02-02 05:39:26'),
(54, 111, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01675341607.jpg', '2023-02-02 05:40:07', '2023-02-02 05:40:07'),
(55, 111, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11675341607.jpg', '2023-02-02 05:40:07', '2023-02-02 05:40:07'),
(56, 111, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21675341607.jpg', '2023-02-02 05:40:07', '2023-02-02 05:40:07'),
(57, 112, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01675341863.jpg', '2023-02-02 05:44:23', '2023-02-02 05:44:23'),
(58, 112, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11675341863.jpg', '2023-02-02 05:44:23', '2023-02-02 05:44:23'),
(59, 112, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21675341863.jpg', '2023-02-02 05:44:23', '2023-02-02 05:44:23'),
(63, 115, 'Foto fotocopy ijazah ( atau berkas data dukung perubahan data lainnya )', 'Akta-Kelahiran-Perubahan/01675674458.jpg', '2023-02-06 02:07:38', '2023-02-06 02:07:38'),
(64, 115, 'Foto Akta Lahir asli', 'Akta-Kelahiran-Perubahan/11675674458.jpg', '2023-02-06 02:07:38', '2023-02-06 02:07:38'),
(65, 116, 'Foto Ijazah atau berkas data dukung perubahan data lainnya', 'KK-Perubahan-Data/01675733653.jpg', '2023-02-06 18:34:14', '2023-02-06 18:34:14'),
(66, 116, 'Foto KK Asli', 'KK-Perubahan-Data/11675733654.jpg', '2023-02-06 18:34:15', '2023-02-06 18:34:15'),
(67, 116, 'Foto Ijazah atau berkas data dukung perubahan data lainnya', 'KK-Perubahan-Data/01675733760.jpg', '2023-02-06 18:36:01', '2023-02-06 18:36:01'),
(68, 116, 'Foto KK Asli', 'KK-Perubahan-Data/11675733761.jpg', '2023-02-06 18:36:02', '2023-02-06 18:36:02'),
(69, 116, 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Perubahan-Data/21675733762.jpg', '2023-02-06 18:36:02', '2023-02-06 18:36:02'),
(70, 117, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01675839210.jpg', '2023-02-07 23:53:30', '2023-02-07 23:53:30'),
(71, 117, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11675839210.jpg', '2023-02-07 23:53:30', '2023-02-07 23:53:30'),
(72, 122, 'Foto Surat keterangan hilang dari desa atau kelurahan', 'KK-Hilang/01675911489.jpg', '2023-02-08 19:58:11', '2023-02-08 19:58:11'),
(73, 122, 'Foto Surat keterangan hilang dari desa atau kelurahan', 'KK-Hilang/01675911535.jpg', '2023-02-08 19:58:57', '2023-02-08 19:58:57'),
(74, 122, 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Hilang/11675911537.jpg', '2023-02-08 19:58:59', '2023-02-08 19:58:59'),
(75, 122, 'Foto Surat keterangan hilang dari desa atau kelurahan', 'KK-Hilang/01675911605.jpg', '2023-02-08 20:00:06', '2023-02-08 20:00:06'),
(76, 122, 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Hilang/11675911606.jpg', '2023-02-08 20:00:07', '2023-02-08 20:00:07'),
(77, 122, 'Foto Surat keterangan hilang dari desa atau kelurahan', 'KK-Hilang/01675911667.jpg', '2023-02-08 20:01:09', '2023-02-08 20:01:09'),
(78, 123, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676244533.jpg', '2023-02-12 16:28:53', '2023-02-12 16:28:53'),
(79, 123, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676244533.jpg', '2023-02-12 16:28:53', '2023-02-12 16:28:53'),
(80, 123, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676244533.jpg', '2023-02-12 16:28:54', '2023-02-12 16:28:54'),
(81, 132, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676487703.jpg', '2023-02-15 12:01:43', '2023-02-15 12:01:43'),
(82, 132, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676487703.jpg', '2023-02-15 12:01:43', '2023-02-15 12:01:43'),
(83, 132, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676487703.jpg', '2023-02-15 12:01:43', '2023-02-15 12:01:43'),
(84, 133, 'Foto KTP-el asli', 'KTP-Perubahan/01676515187.jpg', '2023-02-15 19:39:48', '2023-02-15 19:39:48'),
(85, 133, 'Foto KK Asli', 'KTP-Perubahan/11676515188.jpg', '2023-02-15 19:39:48', '2023-02-15 19:39:48'),
(86, 134, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676520237.jpg', '2023-02-15 21:03:58', '2023-02-15 21:03:58'),
(87, 134, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676520238.jpg', '2023-02-15 21:03:58', '2023-02-15 21:03:58'),
(88, 134, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676520238.jpg', '2023-02-15 21:03:59', '2023-02-15 21:03:59'),
(89, 138, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676614478.jpg', '2023-02-16 23:14:38', '2023-02-16 23:14:38'),
(90, 138, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676614478.jpg', '2023-02-16 23:14:38', '2023-02-16 23:14:38'),
(91, 138, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676614478.jpg', '2023-02-16 23:14:38', '2023-02-16 23:14:38'),
(92, 139, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676862595.jpg', '2023-02-19 20:09:55', '2023-02-19 20:09:55'),
(93, 139, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676862595.jpg', '2023-02-19 20:09:55', '2023-02-19 20:09:55'),
(94, 139, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676862595.jpg', '2023-02-19 20:09:55', '2023-02-19 20:09:55'),
(95, 132, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676864076.jpg', '2023-02-19 20:34:37', '2023-02-19 20:34:37'),
(96, 132, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676864077.jpg', '2023-02-19 20:34:37', '2023-02-19 20:34:37'),
(97, 132, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676864077.jpg', '2023-02-19 20:34:37', '2023-02-19 20:34:37'),
(98, 140, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01676865341.jpg', '2023-02-19 20:55:41', '2023-02-19 20:55:41'),
(99, 140, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11676865341.jpg', '2023-02-19 20:55:41', '2023-02-19 20:55:41'),
(100, 140, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21676865341.jpg', '2023-02-19 20:55:41', '2023-02-19 20:55:41'),
(101, 141, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676865359.jpg', '2023-02-19 20:55:59', '2023-02-19 20:55:59'),
(102, 141, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676865359.jpg', '2023-02-19 20:55:59', '2023-02-19 20:55:59'),
(103, 141, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676865359.jpg', '2023-02-19 20:55:59', '2023-02-19 20:55:59'),
(104, 140, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01676865409.jpg', '2023-02-19 20:56:49', '2023-02-19 20:56:49'),
(105, 140, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11676865409.jpg', '2023-02-19 20:56:49', '2023-02-19 20:56:49'),
(106, 140, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21676865409.jpg', '2023-02-19 20:56:49', '2023-02-19 20:56:49'),
(107, 132, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676865433.jpg', '2023-02-19 20:57:13', '2023-02-19 20:57:13'),
(108, 132, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676865433.jpg', '2023-02-19 20:57:13', '2023-02-19 20:57:13'),
(109, 132, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676865433.jpg', '2023-02-19 20:57:13', '2023-02-19 20:57:13'),
(110, 140, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01676865621.jpg', '2023-02-19 21:00:21', '2023-02-19 21:00:21'),
(111, 140, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11676865621.jpg', '2023-02-19 21:00:21', '2023-02-19 21:00:21'),
(112, 140, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21676865621.jpg', '2023-02-19 21:00:21', '2023-02-19 21:00:21'),
(113, 140, 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)', 'KK-Baru/31676865621.png', '2023-02-19 21:00:21', '2023-02-19 21:00:21'),
(114, 140, 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga', 'KK-Baru/41676865621.png', '2023-02-19 21:00:21', '2023-02-19 21:00:21'),
(115, 142, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01676947656.jpg', '2023-02-20 19:47:36', '2023-02-20 19:47:36'),
(116, 142, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11676947656.pdf', '2023-02-20 19:47:36', '2023-02-20 19:47:36'),
(117, 142, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21676947656.png', '2023-02-20 19:47:36', '2023-02-20 19:47:36'),
(118, 142, 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)', 'KK-Baru/31676947656.png', '2023-02-20 19:47:36', '2023-02-20 19:47:36'),
(119, 142, 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga', 'KK-Baru/41676947656.png', '2023-02-20 19:47:36', '2023-02-20 19:47:36'),
(120, 143, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01676949641.jpg', '2023-02-20 20:20:41', '2023-02-20 20:20:41'),
(121, 143, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11676949641.pdf', '2023-02-20 20:20:41', '2023-02-20 20:20:41'),
(122, 143, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21676949641.png', '2023-02-20 20:20:41', '2023-02-20 20:20:41'),
(123, 143, 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)', 'KK-Baru/31676949641.png', '2023-02-20 20:20:41', '2023-02-20 20:20:41'),
(124, 143, 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga', 'KK-Baru/41676949641.png', '2023-02-20 20:20:41', '2023-02-20 20:20:41'),
(125, 144, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01676959860.jpg', '2023-02-20 23:11:00', '2023-02-20 23:11:00'),
(126, 144, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11676959860.jpg', '2023-02-20 23:11:00', '2023-02-20 23:11:00'),
(127, 144, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21676959860.jpg', '2023-02-20 23:11:00', '2023-02-20 23:11:00'),
(128, 146, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01677031696.pdf', '2023-02-21 19:08:16', '2023-02-21 19:08:16'),
(129, 146, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11677031696.pdf', '2023-02-21 19:08:16', '2023-02-21 19:08:16'),
(130, 146, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21677031696.png', '2023-02-21 19:08:16', '2023-02-21 19:08:16'),
(131, 146, 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)', 'KK-Baru/31677031696.png', '2023-02-21 19:08:16', '2023-02-21 19:08:16'),
(132, 146, 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga', 'KK-Baru/41677031696.png', '2023-02-21 19:08:16', '2023-02-21 19:08:16'),
(133, 144, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677036952.jpg', '2023-02-21 20:35:52', '2023-02-21 20:35:52'),
(134, 144, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677037064.jpg', '2023-02-21 20:37:44', '2023-02-21 20:37:44'),
(135, 144, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677037064.jpg', '2023-02-21 20:37:44', '2023-02-21 20:37:44'),
(136, 144, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677037064.jpg', '2023-02-21 20:37:44', '2023-02-21 20:37:44'),
(137, 147, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677037389.jpg', '2023-02-21 20:43:09', '2023-02-21 20:43:09'),
(138, 147, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677037389.pdf', '2023-02-21 20:43:09', '2023-02-21 20:43:09'),
(139, 147, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677037389.pdf', '2023-02-21 20:43:09', '2023-02-21 20:43:09'),
(140, 149, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677056355.jpg', '2023-02-22 01:59:15', '2023-02-22 01:59:15'),
(141, 149, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677056355.jpg', '2023-02-22 01:59:15', '2023-02-22 01:59:15'),
(142, 149, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677056355.jpg', '2023-02-22 01:59:15', '2023-02-22 01:59:15'),
(143, 152, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677206768.pdf', '2023-02-23 19:46:08', '2023-02-23 19:46:08'),
(144, 152, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677206768.jpg', '2023-02-23 19:46:08', '2023-02-23 19:46:08'),
(145, 152, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677206768.jpg', '2023-02-23 19:46:08', '2023-02-23 19:46:08'),
(146, 153, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677306838.pdf', '2023-02-24 23:33:58', '2023-02-24 23:33:58'),
(147, 153, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677306838.pdf', '2023-02-24 23:33:58', '2023-02-24 23:33:58'),
(148, 153, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677306838.pdf', '2023-02-24 23:33:58', '2023-02-24 23:33:58'),
(149, 154, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677472194.jpg', '2023-02-26 21:29:54', '2023-02-26 21:29:54'),
(150, 154, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677472194.jpg', '2023-02-26 21:29:54', '2023-02-26 21:29:54'),
(151, 154, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677472194.png', '2023-02-26 21:29:54', '2023-02-26 21:29:54'),
(152, 155, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677565341.jpg', '2023-02-27 23:22:22', '2023-02-27 23:22:22'),
(153, 155, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677565342.jpg', '2023-02-27 23:22:23', '2023-02-27 23:22:23'),
(154, 155, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677565343.jpg', '2023-02-27 23:22:23', '2023-02-27 23:22:23'),
(155, 154, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677642327.jpg', '2023-02-28 20:45:27', '2023-02-28 20:45:27'),
(156, 154, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677642327.jpg', '2023-02-28 20:45:28', '2023-02-28 20:45:28'),
(157, 154, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677642328.jpg', '2023-02-28 20:45:30', '2023-02-28 20:45:30'),
(158, 146, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01677643291.jpg', '2023-02-28 21:01:32', '2023-02-28 21:01:32'),
(159, 146, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11677643292.pdf', '2023-02-28 21:01:32', '2023-02-28 21:01:32'),
(160, 146, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21677643292.jpg', '2023-02-28 21:01:33', '2023-02-28 21:01:33'),
(161, 146, 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)', 'KK-Baru/31677643293.jpg', '2023-02-28 21:01:35', '2023-02-28 21:01:35'),
(162, 146, 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga', 'KK-Baru/41677643295.jpg', '2023-02-28 21:01:38', '2023-02-28 21:01:38'),
(163, 157, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677719094.jpg', '2023-03-01 18:04:54', '2023-03-01 18:04:54'),
(164, 157, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677719094.jpg', '2023-03-01 18:04:54', '2023-03-01 18:04:54'),
(165, 157, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677719094.jpg', '2023-03-01 18:04:54', '2023-03-01 18:04:54'),
(166, 158, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01677819947.jpg', '2023-03-02 22:05:47', '2023-03-02 22:05:47'),
(167, 158, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11677819947.jpg', '2023-03-02 22:05:47', '2023-03-02 22:05:47'),
(168, 158, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21677819947.jpg', '2023-03-02 22:05:47', '2023-03-02 22:05:47'),
(169, 159, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01678153402.jpg', '2023-03-06 18:43:23', '2023-03-06 18:43:23'),
(170, 159, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11678153403.jpg', '2023-03-06 18:43:24', '2023-03-06 18:43:24'),
(171, 159, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21678153404.jpg', '2023-03-06 18:43:24', '2023-03-06 18:43:24'),
(172, 160, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01678153593.jpg', '2023-03-06 18:46:33', '2023-03-06 18:46:33'),
(173, 160, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11678153593.jpg', '2023-03-06 18:46:34', '2023-03-06 18:46:34'),
(174, 160, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21678153594.jpg', '2023-03-06 18:46:34', '2023-03-06 18:46:34'),
(175, 133, 'Foto KTP-el asli', 'KTP-Perubahan/01678154551.jpg', '2023-03-06 19:02:31', '2023-03-06 19:02:31'),
(176, 133, 'Foto KK Asli', 'KTP-Perubahan/11678154551.jpg', '2023-03-06 19:02:32', '2023-03-06 19:02:32'),
(177, 161, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01678160984.jpg', '2023-03-06 20:49:44', '2023-03-06 20:49:44'),
(178, 161, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11678160984.png', '2023-03-06 20:49:44', '2023-03-06 20:49:44'),
(179, 161, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21678160984.png', '2023-03-06 20:49:44', '2023-03-06 20:49:44'),
(180, 161, 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)', 'KK-Baru/31678160984.png', '2023-03-06 20:49:44', '2023-03-06 20:49:44'),
(181, 161, 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga', 'KK-Baru/41678160984.png', '2023-03-06 20:49:44', '2023-03-06 20:49:44'),
(182, 162, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', 'KK-Baru/01678246960.jpg', '2023-03-07 20:42:40', '2023-03-07 20:42:40'),
(183, 162, 'Foto Skpwni (bagi penduduk pindah datang)', 'KK-Baru/11678246960.png', '2023-03-07 20:42:40', '2023-03-07 20:42:40'),
(184, 162, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', 'KK-Baru/21678246960.png', '2023-03-07 20:42:40', '2023-03-07 20:42:40'),
(185, 162, 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)', 'KK-Baru/31678246960.png', '2023-03-07 20:42:40', '2023-03-07 20:42:40'),
(186, 162, 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga', 'KK-Baru/41678246960.png', '2023-03-07 20:42:40', '2023-03-07 20:42:40'),
(187, 163, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', 'SKPWNI-Pindah-Keluar/01678341276.jpg', '2023-03-08 22:54:36', '2023-03-08 22:54:36'),
(188, 163, 'Foto KK asli', 'SKPWNI-Pindah-Keluar/11678341276.jpg', '2023-03-08 22:54:36', '2023-03-08 22:54:36'),
(189, 163, 'Foto KTP asli', 'SKPWNI-Pindah-Keluar/21678341276.jpg', '2023-03-08 22:54:36', '2023-03-08 22:54:36');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`) VALUES
(1, 'KTP-Pemula'),
(2, 'KTP-Rusak'),
(3, 'KTP-Hilang'),
(4, 'KTP-Perubahan'),
(5, 'KTP-Disabilitas'),
(6, 'KK-Baru'),
(7, 'KK-Rusak'),
(8, 'KK-Hilang'),
(9, 'KK-Perubahan-Data'),
(10, 'KIA-Baru'),
(11, 'KIA-Rusak'),
(12, 'KIA-Hilang'),
(13, 'KIA-Perubahan-Data'),
(14, 'SKPWNI-Pindah-Keluar'),
(15, 'Akta-Kelahiran-Baru'),
(16, 'Akta-Kelahiran-Rusak'),
(17, 'Akta-Kelahiran-Hilang'),
(18, 'Akta-Kelahiran-Perubahan'),
(19, 'PERKAWINAN'),
(20, 'PERCERAIAN'),
(21, 'KEMATIAN'),
(22, 'PENGADUAN');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_07_01_164227_create_applications_table', 1),
(6, '2022_07_01_164258_create_districts_table', 1),
(7, '2022_07_01_164308_create_wards_table', 1),
(8, '2022_09_03_163938_create_menus_table', 1),
(9, '2022_09_03_163953_create_requirements_table', 1),
(10, '2022_09_03_164001_create_files_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `link` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requirements`
--

INSERT INTO `requirements` (`id`, `menu_id`, `name`, `link`) VALUES
(1, 1, 'Foto KK Terbaru', NULL),
(2, 2, 'Foto KTP-el (rusak)', NULL),
(3, 2, 'Foto KK Asli', NULL),
(4, 3, 'Foto copy KTP-el (jika masih ada)', NULL),
(5, 3, 'Foto KK Asli', NULL),
(6, 3, 'Surat keterangan hilang dari kepolisian', NULL),
(7, 4, 'Foto KTP-el asli', NULL),
(8, 4, 'Foto KK Asli', NULL),
(9, 5, 'Foto Kartu Keluarga', NULL),
(10, 6, 'Foto formulir isian kartu keluarga (KK) dari desa/kelurahan yang sudah diisi', NULL),
(11, 6, 'Foto Skpwni (bagi penduduk pindah datang)', NULL),
(12, 6, 'Foto buku nikah/akta perkawinan (bagi pasangan baru menikah dan/atau bagi pasangan jika status dalam KK “kawin belum tercatat”)', NULL),
(13, 6, 'Foto Surat Keterangan kelahiran putra/putri pemohon yang akan menjadi anggota keluarga baru dalam Kartu Keluarga (KK) (jika ada penambahan anggota keluarga)', NULL),
(14, 6, 'Foto Surat Keterangan Kematian (jika ada pengurangan anggota keluarga', NULL),
(15, 7, 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)', NULL),
(16, 8, 'Foto Surat keterangan hilang dari desa atau kelurahan', NULL),
(17, 8, 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)', NULL),
(18, 9, 'Foto Ijazah atau berkas data dukung perubahan data lainnya', NULL),
(19, 9, 'Foto KK Asli', NULL),
(20, 9, 'Foto nikah/akta nikah (bagi pasangan jika status dalam KK “kawin belum tercatat”)', NULL),
(21, 10, 'Kutipan akta kelahiran', NULL),
(22, 10, 'Kartu Keluarga (KK)', NULL),
(23, 11, 'foto kia rusak', NULL),
(24, 11, 'Foto KK', NULL),
(25, 12, 'Surat Kehilangan KIA dari desa atau kelurahan', NULL),
(26, 12, 'Foto KK', NULL),
(27, 13, 'Foto Ijazah atau berkas data dukung perubahan data lainnya', NULL),
(28, 13, 'Foto KIA Asli', NULL),
(29, 13, 'Foto KK', NULL),
(30, 14, 'Foto Surat Keterangan Pindah dari desa atau kelurahan', NULL),
(31, 14, 'Foto KK asli', NULL),
(32, 14, 'Foto KTP asli', NULL),
(33, 15, 'Surat kelahiran asli dari (Bidan/RSU/Puskesmas dll)', NULL),
(34, 15, 'Foto isian akta kelahiran dari desa / kelurahan', NULL),
(35, 15, 'Foto Buku nikah / akta perkawinan orang tua', NULL),
(36, 15, 'Foto KK asli ( jika yang bersangkutan belum ditambahkan dalam KK )', NULL),
(37, 16, 'Foto KK', NULL),
(38, 17, 'Foto KK', NULL),
(39, 17, 'Foto Surat Keterangan Hilang dari Desa atau Kelurahan', NULL),
(40, 18, 'Foto fotocopy ijazah ( atau berkas data dukung perubahan data lainnya )', NULL),
(41, 18, 'Foto Akta Lahir asli', NULL),
(42, 19, 'Foto Surat Nikah Agama', NULL),
(43, 19, 'Foto KK orang tua Suami', NULL),
(44, 19, 'Foto KK orang tua Istri', NULL),
(45, 19, 'Foto KTP-El Suami', NULL),
(46, 19, 'Foto KTP-El Istri', NULL),
(47, 19, 'Foto KTP-El Saksi 1', NULL),
(48, 19, 'Foto KTP-El Saksi 2', NULL),
(49, 20, 'Foto salinan putusan pengadilan', NULL),
(50, 20, 'Foto KTP-El suami', NULL),
(51, 20, 'Foto KTP-El istri', NULL),
(52, 21, 'Foto Surat keterangan kematian dari Desa / Kelurahan', NULL),
(53, 21, 'Foto KTP-El asli yang bersangkutan', NULL),
(54, 21, 'Foto KK Asli yang bersangkutan', NULL),
(55, 22, 'Foto KTP', NULL),
(56, 22, 'Foto KK', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'sidiadukcapilmorutkab@gmail.com', '2022-09-22 20:54:13', '$2y$10$.BaKy7Q/CGSazkSaR5fRy.gbAWmvO3boxs6zqdQcsFT00ySNpnMli', 'Tc5uEeWLxsfuyRmm2KhJhfJb35b7M9Ts64JBw8EEZhbzBRXvqKmZmW9RzEYp', '2022-09-22 20:54:13', '2022-09-22 20:54:13');

-- --------------------------------------------------------

--
-- Table structure for table `wards`
--

CREATE TABLE `wards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `district_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wards`
--

INSERT INTO `wards` (`id`, `district_id`, `name`, `created_at`, `updated_at`) VALUES
(2, 2, 'KEL.BAHONTULA', '2022-09-29 20:00:15', '2022-09-29 20:00:15'),
(3, 2, 'KEL.BAHOUE', '2022-09-29 20:00:27', '2022-09-29 20:00:27'),
(4, 2, 'KEL.KOLONODALE', '2022-09-29 20:00:36', '2022-09-29 20:00:36'),
(5, 2, 'KOROLOLAKI', '2022-09-29 20:00:59', '2022-09-29 20:00:59'),
(6, 2, 'KOROLOLAMA', '2022-09-29 20:01:04', '2022-09-29 20:01:04'),
(7, 2, 'KOROMATANTU', '2022-09-29 20:01:20', '2022-09-29 20:01:20'),
(8, 2, 'KOYA', '2022-09-29 20:01:27', '2022-09-29 20:01:27'),
(9, 2, 'GANDA-GANDA', '2022-09-29 20:01:34', '2022-09-29 20:01:34'),
(10, 2, 'GILILANA', '2022-09-29 20:01:40', '2022-09-29 20:01:40'),
(11, 2, 'TANAUGE', '2022-09-29 20:01:48', '2022-09-29 20:01:48'),
(12, 3, 'BUNTA', '2022-09-29 20:03:15', '2022-09-29 20:03:15'),
(13, 3, 'TOMPIRA', '2022-09-29 20:03:20', '2022-09-29 20:03:20'),
(14, 3, 'TOWARA', '2022-09-29 20:03:24', '2022-09-29 20:03:24'),
(15, 3, 'BUNGINTIMBE', '2022-09-29 20:03:30', '2022-09-29 20:03:30'),
(16, 3, 'TOWARA PANTAI', '2022-09-29 20:03:46', '2022-09-29 20:03:46'),
(17, 5, 'BETELEME', '2022-09-29 20:04:03', '2022-09-29 20:04:03'),
(18, 10, 'BATURUBE', '2022-09-29 20:15:40', '2022-09-29 20:15:40'),
(19, 3, 'MOLINO', '2022-10-07 07:35:02', '2022-10-07 07:35:02'),
(20, 3, 'MOHONI', '2022-10-07 07:35:10', '2022-10-07 07:35:10'),
(21, 3, 'UNGKEA', '2022-10-07 07:35:27', '2022-10-07 07:35:27'),
(22, 3, 'BIMOR JAYA', '2022-10-07 07:35:35', '2022-10-07 07:35:35'),
(23, 3, 'MOLORES', '2022-10-07 07:35:43', '2022-10-07 07:35:43'),
(24, 3, 'KEUNO', '2022-10-07 07:35:55', '2022-10-07 07:35:55'),
(25, 3, 'PEBOA', '2022-10-07 07:36:20', '2022-10-07 07:36:20'),
(26, 4, 'TIU', '2022-10-07 07:36:40', '2022-10-07 07:36:40'),
(27, 4, 'TONTOWEA', '2022-10-07 07:36:47', '2022-10-07 07:36:47'),
(28, 4, 'TOGO MULYO', '2022-10-07 07:36:54', '2022-10-07 07:36:54'),
(29, 4, 'MARALEE', '2022-10-07 07:37:00', '2022-10-07 07:37:00'),
(30, 4, 'MONDOWE', '2022-10-07 07:37:06', '2022-10-07 07:37:06'),
(31, 4, 'SAMPALOWO', '2022-10-07 07:37:12', '2022-10-07 07:37:12'),
(32, 4, 'MOLEONO', '2022-10-07 07:37:17', '2022-10-07 07:37:17'),
(33, 4, 'ONEPUTE', '2022-10-07 07:37:25', '2022-10-07 07:37:25'),
(34, 4, 'ULU LAA', '2022-10-07 07:37:37', '2022-10-07 07:37:37'),
(35, 4, 'TADAKU JAYA', '2022-10-07 07:38:00', '2022-10-07 07:38:00'),
(36, 5, 'ULUANSO', '2022-10-07 07:38:23', '2022-10-07 07:38:23'),
(37, 5, 'MORA', '2022-10-07 07:38:30', '2022-10-07 07:38:30'),
(38, 5, 'WARA\'A', '2022-10-07 07:38:39', '2022-10-07 07:38:39'),
(39, 5, 'TINGKEAO', '2022-10-07 07:38:52', '2022-10-07 07:38:52'),
(40, 5, 'WAWOPADA', '2022-10-07 07:39:13', '2022-10-07 07:39:13'),
(41, 5, 'KOROWALELO', '2022-10-07 07:39:21', '2022-10-07 07:39:21'),
(42, 5, 'TINOMPO', '2022-10-07 07:39:27', '2022-10-07 07:39:27'),
(43, 5, 'KUMPI', '2022-10-07 07:39:34', '2022-10-07 07:39:34'),
(44, 5, 'KOROMPEELI', '2022-10-07 07:39:44', '2022-10-07 07:39:44'),
(45, 5, 'LEMBOROMA', '2022-10-07 07:39:59', '2022-10-07 07:39:59'),
(46, 5, 'KOROWOU', '2022-10-07 07:40:09', '2022-10-07 07:40:09'),
(47, 5, 'LEMBOBARU', '2022-10-07 07:40:22', '2022-10-07 07:40:22'),
(48, 5, 'KOROBONDE', '2022-10-07 07:40:33', '2022-10-07 07:40:33'),
(49, 6, 'DOLUPO KARYA', '2022-10-07 07:40:49', '2022-10-07 07:40:49'),
(50, 6, 'PO\'ONA', '2022-10-07 07:40:56', '2022-10-07 07:40:56'),
(51, 6, 'PETUMBEA', '2022-10-07 07:41:01', '2022-10-07 07:41:01'),
(52, 6, 'RONTA', '2022-10-07 07:41:08', '2022-10-07 07:41:08'),
(53, 6, 'PONTANGOA', '2022-10-07 07:41:19', '2022-10-07 07:41:19'),
(54, 6, 'JAMOR JAYA', '2022-10-07 07:41:26', '2022-10-07 07:41:26'),
(55, 6, 'PA\'AWARU', '2022-10-07 07:41:34', '2022-10-07 07:41:34'),
(56, 6, 'LEMBOBELALA', '2022-10-07 07:41:43', '2022-10-07 07:41:43'),
(57, 6, 'BINTANGOR MUKTI', '2022-10-07 07:42:04', '2022-10-07 07:42:04'),
(58, 6, 'MANDULA', '2022-10-07 07:42:10', '2022-10-07 07:42:10'),
(59, 7, 'TOMATA', '2022-10-07 07:44:48', '2022-10-07 07:44:48'),
(60, 7, 'LONDI', '2022-10-07 07:44:53', '2022-10-07 07:44:53'),
(61, 7, 'TAENDE', '2022-10-07 07:44:58', '2022-10-07 07:44:58'),
(62, 7, 'ENSA', '2022-10-07 07:45:03', '2022-10-07 07:45:03'),
(63, 7, 'KOLAKA', '2022-10-07 07:45:12', '2022-10-07 07:45:12'),
(64, 7, 'PEONEA', '2022-10-07 07:45:23', '2022-10-07 07:45:23'),
(65, 7, 'LANUMOR', '2022-10-07 07:45:29', '2022-10-07 07:45:29'),
(66, 7, 'GONTARA', '2022-10-07 07:45:36', '2022-10-07 07:45:36'),
(67, 7, 'LEE', '2022-10-07 07:45:42', '2022-10-07 07:45:42'),
(68, 7, 'SAEMBA', '2022-10-07 07:45:48', '2022-10-07 07:45:48'),
(69, 7, 'KASINGOLI', '2022-10-07 07:45:56', '2022-10-07 07:45:56'),
(70, 7, 'TOMUI KARYA', '2022-10-07 07:46:37', '2022-10-07 07:46:37'),
(71, 7, 'SAEMBA WALATI', '2022-10-07 07:46:43', '2022-10-07 07:46:43'),
(72, 7, 'PAMBAREA', '2022-10-07 07:46:49', '2022-10-07 07:46:49'),
(73, 8, 'ERA', '2022-10-07 07:47:03', '2022-10-07 07:47:03'),
(74, 8, 'PELERU', '2022-10-07 07:47:08', '2022-10-07 07:47:08'),
(75, 8, 'TAMONJENGI', '2022-10-07 07:47:14', '2022-10-07 07:47:14'),
(76, 8, 'MAYUMBA', '2022-10-07 07:47:20', '2022-10-07 07:47:20'),
(77, 8, 'TIWA\'A', '2022-10-07 07:47:26', '2022-10-07 07:47:26'),
(78, 8, 'LEMBONTONARA', '2022-10-07 07:47:34', '2022-10-07 07:47:34'),
(79, 8, 'TABARANO', '2022-10-07 07:47:40', '2022-10-07 07:47:40'),
(80, 8, 'WAWONDULA', '2022-10-07 07:47:46', '2022-10-07 07:47:46'),
(81, 9, 'LEMBAH SUMARA', '2022-10-07 07:48:27', '2022-10-07 07:48:27'),
(82, 9, 'SUMARA JAYA', '2022-10-07 07:48:32', '2022-10-07 07:48:32'),
(83, 9, 'TAMBAYOLI', '2022-10-07 07:48:38', '2022-10-07 07:48:38'),
(84, 9, 'MALINO', '2022-10-07 07:48:43', '2022-10-07 07:48:43'),
(85, 9, 'PANCA MAKMUR', '2022-10-07 07:48:49', '2022-10-07 07:48:49'),
(86, 9, 'TAMAINUSI', '2022-10-07 07:48:56', '2022-10-07 07:48:56'),
(87, 9, 'BAU', '2022-10-07 07:49:02', '2022-10-07 07:49:02'),
(88, 9, 'MALINO JAYA', '2022-10-07 07:49:11', '2022-10-07 07:49:11'),
(89, 9, 'TODDOPULI UEBANGKE', '2022-10-07 07:49:19', '2022-10-07 07:49:19'),
(90, 9, 'TANDOYONDO', '2022-10-07 07:49:26', '2022-10-07 07:49:26'),
(91, 10, 'POSANGKE', '2022-10-07 07:49:43', '2022-10-07 07:49:43'),
(92, 10, 'TARONGGO', '2022-10-07 07:49:48', '2022-10-07 07:49:48'),
(93, 10, 'UERURU', '2022-10-07 07:49:53', '2022-10-07 07:49:53'),
(94, 10, 'UEWAJO', '2022-10-07 07:49:59', '2022-10-07 07:49:59'),
(95, 10, 'TIRONGAN ATAS', '2022-10-07 07:50:06', '2022-10-07 07:50:06'),
(96, 10, 'TIRONGAN BAWAH', '2022-10-07 07:50:13', '2022-10-07 07:50:13'),
(97, 10, 'SILITI', '2022-10-07 07:50:45', '2022-10-07 07:50:45'),
(98, 10, 'LEMO', '2022-10-07 07:50:50', '2022-10-07 07:50:50'),
(99, 10, 'SALUBIRO', '2022-10-07 07:50:56', '2022-10-07 07:50:56'),
(100, 10, 'UEMASI', '2022-10-07 07:51:03', '2022-10-07 07:51:03'),
(101, 10, 'OPO', '2022-10-07 07:51:26', '2022-10-07 07:51:26'),
(102, 10, 'TANAKURAYA', '2022-10-07 07:51:32', '2022-10-07 07:51:32'),
(103, 10, 'TAMBAROBONE', '2022-10-07 07:51:39', '2022-10-07 07:51:39'),
(104, 10, 'WOOMPARIGI', '2022-10-07 07:51:50', '2022-10-07 07:51:50'),
(105, 10, 'BOBA', '2022-10-07 07:51:57', '2022-10-07 07:51:57'),
(106, 10, 'KALOMBANG', '2022-10-07 07:52:11', '2022-10-07 07:52:11'),
(107, 10, 'TOKONANAKA', '2022-10-07 07:52:16', '2022-10-07 07:52:16'),
(108, 10, 'MATUBE', '2022-10-07 07:52:23', '2022-10-07 07:52:23'),
(109, 10, 'LEMOWALIA', '2022-10-07 07:52:29', '2022-10-07 07:52:29'),
(110, 10, 'UEMPANAPA', '2022-10-07 07:52:35', '2022-10-07 07:52:35'),
(111, 10, 'TOKALA ATAS', '2022-10-07 07:52:42', '2022-10-07 07:52:42'),
(112, 10, 'POKEANG', '2022-10-07 07:52:47', '2022-10-11 03:46:32'),
(113, 11, 'PANDAUKE', '2022-10-07 07:54:15', '2022-10-07 07:54:15'),
(114, 11, 'KOLO BAWAH', '2022-10-07 07:54:23', '2022-10-07 07:54:23'),
(115, 11, 'KOLO ATAS', '2022-10-07 07:54:35', '2022-10-07 07:54:35'),
(116, 11, 'MOMO', '2022-10-07 07:54:40', '2022-10-07 07:54:40'),
(117, 11, 'TANANAGAYA', '2022-10-07 07:54:51', '2022-10-07 07:54:51'),
(118, 11, 'UEPAKATU', '2022-10-07 07:55:01', '2022-10-07 07:55:01'),
(119, 11, 'LIJO', '2022-10-07 07:55:06', '2022-10-07 07:55:06'),
(120, 11, 'TANASUMPU', '2022-10-07 07:55:12', '2022-10-07 07:55:12'),
(121, 11, 'PARANGISI', '2022-10-07 07:55:18', '2022-10-07 07:55:18'),
(122, 11, 'GIRIMULYA', '2022-10-07 07:55:24', '2022-10-07 07:55:24'),
(123, 11, 'WINANGABINO', '2022-10-07 07:55:31', '2022-10-07 07:55:31'),
(124, 11, 'TAMBALE', '2022-10-07 07:56:09', '2022-10-07 07:56:09'),
(125, 11, 'SEA', '2022-10-07 07:56:15', '2022-10-07 07:56:15'),
(126, 11, 'MENYO\'E', '2022-10-07 07:56:20', '2022-10-07 07:56:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `files_application_id_foreign` (`application_id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requirements_menu_id_foreign` (`menu_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `wards`
--
ALTER TABLE `wards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wards_district_id_foreign` (`district_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requirements`
--
ALTER TABLE `requirements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wards`
--
ALTER TABLE `wards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_application_id_foreign` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `requirements`
--
ALTER TABLE `requirements`
  ADD CONSTRAINT `requirements_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wards`
--
ALTER TABLE `wards`
  ADD CONSTRAINT `wards_district_id_foreign` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
