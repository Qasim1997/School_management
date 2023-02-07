<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AttendanceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\Auth\AdminController;
use App\Http\Controllers\Auth\AdminResetPassword;
use App\Http\Controllers\ClassNameController;
use App\Http\Controllers\ClassnamedController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\ParentsController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Models\Appointment;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/register', [AdminController::class, 'adminregister'])->name('user.index');
    Route::post('/login', [AdminController::class, 'adminlogin'])->name('user.index');
    Route::post('/logout', [AdminController::class, 'logout'])->name('user.index');
    Route::post('/me', [AdminController::class, 'me'])->name('user.index');
});

// Route::prefix('admin')->controller(AdminController::class)->group(function () {

//     Route::post('login', 'login');
//     Route::post('register', 'register');
//     Route::middleware('auth:admin_api')->group(function () {
//         Route::post('logout', 'logout');
//         Route::post('me', 'me');
//     });
// });
Route::prefix('admin')->controller(UserController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('refresh', 'refresh');
    Route::post('changepassword', 'changepassword');
    Route::post('register', 'register');
    Route::delete('delete/{id}', 'delete');
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', 'logout');
        Route::get('me', 'me');

    });
});
Route::prefix('admin')->group(function () {
    Route::post('send-reset-password-email', [AdminResetPassword::class, 'send_password_email']);
    Route::post('reset-password/{token}', [AdminResetPassword::class, 'password_reset']);
    Route::resource('attendance', AttendanceController::class);
    Route::resource('appointment',AppointmentController ::class);
    Route::resource('teacher', TeacherController::class);
    Route::get('test', [AttendanceController::class, 'test'])->name('user.index');
});
Route::group(['prefix' => 'admin',  'middleware' => ['jwt.verify']], function() {
    // Route::post('me', 'me');
    Route::post('refresh', [UserController::class, 'refresh']);
    // Route::get('user', 'UserController@getAuthenticatedUser');
    Route::resource('class', ClassnamedController::class);
    Route::get('closed', 'DataController@closed');
    Route::resource('attendance',AttendanceController ::class);
    Route::resource('library',LibraryController ::class);
    Route::resource('fee',FeeController ::class);
    Route::get('user', [UserController::class, 'getAuthenticatedUser'])->name('user.index');
    Route::get('getclass/{id}', [AttendanceController::class, 'getclass'])->name('user.index');
    Route::get('getstudent/{id}', [AttendanceController::class, 'getstudent'])->name('user.index');
    Route::post('addattendance/{teacher_id}/{student_id}/{date}', [AttendanceController::class, 'addattendance'])->name('user.index');
    Route::get('getalluser', [UserController::class, 'getAuthenticatedUser'])->name('user.index');
    Route::get('getstudentstatus/{id}/{date}', [AttendanceController::class, 'getstudentstatus'])->name('user.index');
    Route::get('getfeefromdate/{id}/{date}', [FeeController::class, 'getfeefromdate'])->name('user.index');
    Route::get('getstudentfromclass/{id}', [StudentController::class, 'getstudentfromclass'])->name('user.index');
    Route::resource('subject', SubjectController::class);
    Route::resource('parant',ParentsController ::class);
    // public function addattendance(Request $request, $teacher_id, $student_id){
    Route::resource('student', StudentController::class);
});

