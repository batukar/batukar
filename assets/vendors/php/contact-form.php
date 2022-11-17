<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';


if($_SERVER["REQUEST_METHOD"] == "POST") {
	// Sender Data
	$senderName = trim(strip_tags($_POST["name"]));
	$senderEmail = filter_var(trim(strip_tags($_POST["email"])), FILTER_SANITIZE_EMAIL);
	$senderSubject = trim(strip_tags($_POST["subject"]));
	$senderMessage = trim(htmlentities($_POST["message"]));

	if(empty($senderName) || empty($senderEmail) || empty($senderSubject) || empty($senderMessage)) {
		// Set a 400 (bad request) response code and exit
		http_response_code(400);
		echo "Lütfen formu doldurduktan sonra tekrar deneyin!";
		exit;
	} else { 
		if(!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) { 
			// Set a 400 (bad request) response code and exit
			http_response_code(400);
			echo "Geçersiz mail formatı! Lütfen mailinizi kontrol edin.";
			exit;
		}
	}

	$mail = new PHPMailer(true);

	try {
    //Server settings
    $mail->isSMTP();                                     	// Send using SMTP
    $mail->Host       = 'smtp.iste.edu.tr';             		// Set the SMTP server to send through
    $mail->SMTPAuth   = true;                            	// Enable SMTP authentication
    $mail->Username   = 'batuhan.karadag@iste.edu.tr';             // SMTP username
    $mail->Password   = 'cebku1-xumnih-hUbran';                        	// SMTP password
    $mail->SMTPSecure = 'tls';  							// Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 587;                             	// TCP port to connect to

    //Recipients
    $mail->setFrom($senderEmail, $senderName);
    $mail->addAddress('batuhan.karadag@iste.edu.tr', 'batukar');     // Add a recipient
    $mail->addReplyTo($senderEmail, $senderName);

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $senderSubject;
    $mail->Body    = "<b>Name</b>: $senderName<br><b>Email</b>: $senderEmail<br><br><b>Message</b>: $senderMessage";
    $mail->AltBody = "Name: $senderName\nEmail: $senderEmail\n\nMessage: $senderMessage";

    $mail->send();
    echo 'Mesajınız Gönderildi!';
	} catch (Exception $e) {
		http_response_code(400);
	  echo "Mailer Error: {$mail->ErrorInfo}";
	}

} else { 
	// Not a POST request, set a 403 (forbidden) response code
	http_response_code(403);
}

?>