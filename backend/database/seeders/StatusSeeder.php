<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    public function run()
    {
        DB::table('statuses')->insert([
            ['id' => 1, 'name' => 'A fazer'],
            ['id' => 2, 'name' => 'Em andamento'],
            ['id' => 3, 'name' => 'Finalizada'],
        ]);
    }
}
