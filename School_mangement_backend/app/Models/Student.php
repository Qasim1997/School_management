<?php

namespace App\Models;
use App\Models\classnamed;
use App\Models\Attendance;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\User;

class Student extends Model
{
    protected $with = ['classnamed'];
    use HasFactory;
    public function classnamed(){
        return $this->belongsTo(classnamed::class);
    }
    public function attendance(){
        return $this->hasMany(Attendance::class);
    }
    public function fee(){
        return $this->hasMany(Fee::class);
    }
    public function user(){
        return $this->hasOne(User::class);
    }
    protected $fillable = ['first_name','last_name','email','age','rollnumber','image','contact_number','address','classnamed_id' , 'display_name'];
}
