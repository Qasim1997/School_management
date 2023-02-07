<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parents extends Model
{
    use HasFactory;
    protected $with = ['student'];
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    protected $fillable = ['name','email','contact_number','student_id'];
}
