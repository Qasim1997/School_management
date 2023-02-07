<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory;
    protected $fillable = ['student_id' , 'admission_fee' , 'miscellaneous_fee', 'monthly_fee' , 'total' , 'status','challan_id','after_due_date','date','issue_date','month', 'classnamed_id'];
    protected $with = ['student','classnamed'];
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    public function classnamed()
    {
        return $this->belongsTo(classnamed::class);
    }
}
