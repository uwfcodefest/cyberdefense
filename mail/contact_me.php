<?php

function mailgun_send($to, $subject, $message) {

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	curl_setopt($ch, CURLOPT_USERPWD, 'api:'.'key-77479f4c72a58e1d048c653dd5bd50bb');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	$plain = strip_tags(nl2br($message));

	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
	curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v2/'.'uwfcodefest.com'.'/messages');
	curl_setopt($ch, CURLOPT_POSTFIELDS, array('from' => 'website@'.'uwfcodefest.com',
		'to' => $to,
		'subject' => $subject,
		'html' => $message,
		'text' => $plain));

	$j = json_decode(curl_exec($ch));

	$info = curl_getinfo($ch);

	curl_close($ch);

	return $j;
}

//Check for empty fields
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) {
	echo "No arguments Provided!";
	return false;
}
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
	
// Where should the message be sent?
$to = 'admin@ryanmcafee.com';

//Set the Subject
$email_subject = "New Message - CyberDefense -  $name";

//Set the body content
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";

//Set who the email is being sent from
$headers = "From: noreply@uwfcodefest.com\n";

//Set the reply to email address to be the email address collected in the form
$headers .= "Reply-To: $email_address";

mailgun_send($to, $email_subject, $email_body);

return true;

?>