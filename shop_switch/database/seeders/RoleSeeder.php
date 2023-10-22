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
        $role_saler_admin = Role::create(['name' => 'Saler Admin']);

        Permission::create(['name' => 'admin.categories.index','description'=>'Listar Categorias','models'=>'Categorias de Producto'])->syncRoles([$role_admin,$role_saler,$role_saler_admin]);
        Permission::create(['name' => 'admin.categories.store','description'=>'Guardar Categorias','models'=>'Categorias de Producto'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.categories.update','description'=>'Actualizar Categorias','models'=>'Categorias de Producto'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.categories.destroy','description'=>'Eliminar Categorias','models'=>'Categorias de Producto'])->syncRoles([$role_admin]);

        Permission::create(['name' => 'admin.users.index','description'=>'Listar Usarios','models'=>'Usuarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.update','description'=>'Actualizar Usarios','models'=>'Usuarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.destroy','description'=>'Eliminar Usarios','models'=>'Usuarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.show','description'=>'Mostrar Usarios','models'=>'Usuarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.delete_token','description'=>'Eliminar Sessiones de Usuarios','models'=>'Usuarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.show_tokens','description'=>'Mostrar Secciones de Usuarios','models'=>'Usuarios'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.users.active_user','description'=>'Activacion de usuarios','models'=>'Usuarios'])->syncRoles([$role_admin]);

        Permission::create(['name' => 'admin.roles.index','description'=>'Listar Roles','models'=>'Roles'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.roles.show','description'=>'Mostrar Rol','models'=>'Roles'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.roles.create','description'=>'Crear Rol','models'=>'Roles'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.roles.update','description'=>'Editar Rol','models'=>'Roles'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.roles.destroy','description'=>'Eliminar Rol','models'=>'Roles'])->syncRoles([$role_admin]);

        Permission::create(['name' => 'admin.permissions.index','description'=>'Obtener Permisos','models'=>'Permisos'])->syncRoles([$role_admin]);

        Permission::create(['name' => 'admin.labels.index','description'=>'Listar Etiquetas','models'=>'Etiquetas'])->syncRoles([$role_admin,$role_saler,$role_saler_admin]);
        Permission::create(['name' => 'admin.labels.create','description'=>'Crear Etiquetas','models'=>'Etiquetas'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.labels.update','description'=>'Editar Etiquetas','models'=>'Etiquetas'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.labels.destroy','description'=>'Eliminar Etiquetas','models'=>'Etiquetas'])->syncRoles([$role_admin]);

        Permission::create(['name' => 'admin.companies.index','description'=>'Listar Compañias','models'=>'Compañias'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.companies.store','description'=>'Crear Compañia','models'=>'Compañias'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.companies.update','description'=>'Actualizar Compañia','models'=>'Compañias'])->syncRoles([$role_admin]);
        Permission::create(['name' => 'admin.companies.delete','description'=>'Eliminar Compañia','models'=>'Compañias'])->syncRoles([$role_admin]);

        Permission::create(['name' => 'saler.companies.update','description'=>'Actualizar Compañia Saler','models'=>'Compañias'])->syncRoles([$role_admin,$role_saler_admin]);
        Permission::create(['name' => 'saler.companies.index','description'=>'Listar Compañia Saler','models'=>'Compañias'])->syncRoles([$role_admin,$role_saler_admin,$role_saler]);

    }
}
