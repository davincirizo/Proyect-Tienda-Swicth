<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::create(['name' => 'Admin']);
        $role_saler = Role::create(['name' => 'Saler']);
        $role_user = Role::create(['name' => 'User']);

        Permission::create(['name' => 'admin.categories.index','description'=>'Listar Categorias'])->syncRoles([$role_admin,$role_saler]);
        Permission::create(['name' => 'admin.categories.store','description'=>'Guardar Categorias'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.categories.update','description'=>'Actualizar Categorias'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.categories.destroy','description'=>'Eliminar Categorias'])->syncRoles([$role_admin]);

        Permission::create(['name' => 'admin.users.index','description'=>'Listar Usarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.update','description'=>'Actualizar Usarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.destroy','description'=>'Eliminar Usarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.show','description'=>'Mostrar Usarios'])->syncRoles([$role_admin]);
    }
}
