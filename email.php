<?php
if(isset($_POST['submit'])) {

    $to = "cj_test123@mailinator.com";
    $subject = "Form Submission";
    $name_field = $_POST['name'];
    $email_field = $_POST['email'];
    $message = $_POST['message'];

    $body = "From: $name_field\n E-Mail: $email_field\n Message:\n $message";

    echo "Data has been submitted to $to!";
    mail($to, $subject, $body);

} else {

    echo "fail!";

}
