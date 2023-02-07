<?php

namespace App\Models;
use App\Models\Teacher;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $with = ['teacher','student'];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    protected $fillable = ['status' ,'teacher_id' ,'student_id', 'date', 'class'];
}
