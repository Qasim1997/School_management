<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    protected $with = ['teacher','classnamed'];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
    public function classnamed()
    {
        return $this->belongsTo(classnamed::class);
    }
    protected $fillable = ['name','classnamed_id' ,'teacher_id'];
}
