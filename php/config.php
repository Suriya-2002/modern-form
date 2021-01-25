<?php

$host = 'localhost';
$databaseUser = 'root';
$databasePassword = 'sqldatabase';
$databaseName = 'modern-form';

$domainSourceName = 'mysql:host=' . $host . ';dbname=' . $databaseName;

$connection = new PDO($domainSourceName, $databaseUser, $databasePassword);
$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);