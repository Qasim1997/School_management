<?php

namespace App\Models;

use App\Models\Teacher;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class classnamed extends Model
{
    use HasFactory;
    protected $with = ['teacher'];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
    public function student()
    {
        return $this->hasone(Student::class);
    }
    public function fee()
    {
        return $this->hasMany(Fee::class);
    }
    protected $fillable = ['name', 'numeric', 'teacher_id'];

}
