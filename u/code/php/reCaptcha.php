<?php
include("recaptchalib/lib/ReCaptchaToken.php");
$config = ['site_key' => 'foo', 'site_secret' => 'bar'];
$recaptchaToken = new \ReCaptchaSecureToken\ReCaptchaToken($config);

//Generate recaptcha token
$sessionId = uniqid('recaptcha');
$secureToken = $recaptchaToken->secureToken($sessionId);