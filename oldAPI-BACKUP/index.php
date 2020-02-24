<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
// header('Access-Control-Allow-Methods:  ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]');
// header("Access-Control-Allow-Credentials: true");
// header('Content-Type: application/json');
//Autoload
$loader = require 'vendor/autoload.php';

//Instanciando objeto
$app = new \Slim\Slim(array(
	'templates.path' => 'templates'
));


// LOGIN

$app->post('/login', function () use ($app) {
	(new \controllers\User($app))->doLogin();
});

$app->post('/clinic/login', function () use ($app) {
	(new \controllers\Clinic($app))->doLogin();
});

$app->post('/doctor/login', function () use ($app) {
	(new \controllers\Doctor($app))->doLogin();
});


// MEDICOS API
$app->get('/doctors/', function () use ($app) {
	(new \controllers\Doctor($app))->lista();
});

$app->get('/doctor/:cpf', function ($cpf) use ($app) {
	(new \controllers\Doctor($app))->get($cpf);
});

$app->get('/doctor/byName/:name', function ($name) use ($app) {
	(new \controllers\Doctor($app))->getByName($name);
});

$app->post('/doctor/', function () use ($app) {
	(new \controllers\Doctor($app))->new();
});

$app->post('/doctor/edit/:cpf', function ($cpf) use ($app) {
	(new \controllers\Doctor($app))->editar($cpf);
});

// PACIENTES API

$app->get('/patients/', function () use ($app) {
	(new \controllers\Patient($app))->lista();
});

$app->get('/patient/:cpf', function ($cpf) use ($app) {
	(new \controllers\Patient($app))->get($cpf);
});

$app->get('/patient/:cpf/procedures', function ($cpf) use ($app) {
	(new \controllers\Patient($app))->getAllSchedule($cpf);
});

$app->get('/patient/byName/:name', function ($name) use ($app) {
	(new \controllers\Patient($app))->getByName($name);
});

$app->post('/patient/', function () use ($app) {
	(new \controllers\Patient($app))->new();
});

$app->post('/patient/edit/:cpf', function ($cpf) use ($app) {
	(new \controllers\Patient($app))->editar($cpf);
});

$app->post('/patient/edit/plan/:cpf', function ($cpf) use ($app) {
	(new \controllers\Patient($app))->editarPlan($cpf);
});

$app->post('/patient/linkPlan', function () use ($app) {
	(new \controllers\Patient($app))->linkarPlanPatient();
});



// Planos API


$app->get('/plans/', function () use ($app) {
	(new \controllers\Plan($app))->lista();
});

$app->get('/plan/:cnpj', function ($cnpj) use ($app) {
	(new \controllers\Plan($app))->get($cnpj);
});

$app->post('/plan/', function () use ($app) {
	(new \controllers\Plan($app))->new();
});

$app->post('/plan/edit/:cnpj', function ($cnpj) use ($app) {
	(new \controllers\Plan($app))->editar($cnpj);
});

// Clinica API


$app->get('/clinics/', function () use ($app) {
	(new \controllers\Clinic($app))->lista();
});

$app->get('/clinic/:cnpj', function ($cnpj) use ($app) {
	(new \controllers\Clinic($app))->get($cnpj);
});

$app->get('/clinic/byName/:name', function ($name) use ($app) {
	(new \controllers\Clinic($app))->getByName($name);
});

$app->post('/clinic/', function () use ($app) {
	(new \controllers\Clinic($app))->new();
});

$app->post('/clinic/edit/:cnpj', function ($cnpj) use ($app) {
	(new \controllers\Clinic($app))->editar($cnpj);
});

$app->post('/clinic/owner', function () use ($app) {
	(new \controllers\Clinic($app))->newOwner();
});

$app->post('/clinic/owner/edit/:cnpj', function ($cnpj) use ($app) {
	(new \controllers\Clinic($app))->editarOwner($cnpj);
});

$app->post('/clinic/tech', function () use ($app) {
	(new \controllers\Clinic($app))->newTech();
});

$app->post('/clinic/:cnpj/tech/edit/:cpf', function ($cnpj, $cpf) use ($app) {
	(new \controllers\Clinic($app))->editarTech($cnpj, $cpf);
});

$app->post('/clinic/delete/:cnpj', function ($cnpj) use ($app) {
	(new \controllers\Clinic($app))->excluir($cnpj);
});



// Procedure API


$app->get('/procedures/', function () use ($app) {
	(new \controllers\Procedure($app))->lista();
});

$app->get('/procedure/:id', function ($id) use ($app) {
	(new \controllers\Procedure($app))->get($id);
});

$app->get('/procedure/delete/:id', function ($id) use ($app) {
	(new \controllers\Procedure($app))->excluir($id);
});

$app->get('/procedure/:id/plans', function ($id) use ($app) {
	(new \controllers\Procedure($app))->getPlans($id);
});

$app->get('/procedure/byName/:name', function ($name) use ($app) {
	(new \controllers\Procedure($app))->getByNameOrSpeciality($name);
});

$app->get('/procedure/schedule/byDoctor/:cpf', function ($cpf) use ($app) {
	(new \controllers\Procedure($app))->getByDoctor($cpf);
});

$app->get('/procedure/schedule/all', function () use ($app) {
	(new \controllers\Procedure($app))->getAllSchedule();
});

$app->get('/procedure/schedule/:id', function ($id) use ($app) {
	(new \controllers\Procedure($app))->getScheduleById($id);
});


$app->post('/procedure/patient', function () use ($app) {
	(new \controllers\Procedure($app))->newProcedure();
});

$app->post('/procedure/link', function () use ($app) {
	(new \controllers\Procedure($app))->linkPlansToProcedure();
});

$app->post('/procedure/', function () use ($app) {
	(new \controllers\Procedure($app))->new();
});


//Listando todas
$app->get('/pessoas/', function () use ($app) {
	(new \controllers\Pessoa($app))->lista();
});

//get pessoa
$app->get('/pessoas/:id', function ($id) use ($app) {
	(new \controllers\Pessoa($app))->get($id);
});

//nova pessoa
$app->post('/pessoas/', function () use ($app) {
	(new \controllers\Pessoa($app))->nova();
});

//edita pessoa
$app->put('/pessoas/:id', function ($id) use ($app) {
	(new \controllers\Pessoa($app))->editar($id);
});

//apaga pessoa
$app->delete('/pessoas/:id', function ($id) use ($app) {
	(new \controllers\Pessoa($app))->excluir($id);
});

//Rodando aplicação
$app->run();
