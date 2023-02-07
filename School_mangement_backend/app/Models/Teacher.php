<?php

namespace App\Models;
use App\Models\classnamed;
use App\Models\Subject;
use App\Models\Attendance;
use App\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    public function classnamed(){
        return $this->hasMany(classnamed::class);
    }
    public function subject(){
        return $this->hasOne(Subject::class);
    }
    public function attendance(){
        return $this->hasMany(Attendance::class);
    }
    public function user(){
        return $this->hasOne(User::class);
    }
    protected $fillable = ['label',];
}
