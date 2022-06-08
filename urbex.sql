drop database if exists urbex;
create database urbex;
use urbex;

drop table if exists roles;
create table roles(
    id int primary key auto_increment,
    name varchar(200) not null
);

drop table if exists users;
create table users(
    id int primary key auto_increment,
    email varchar(200) not null unique,
    username varchar(200) not null unique,
    contrasena varchar(10) not null unique,
	role_id int not null default 1 ,
	foreign key (role_id) references roles(id)
        on delete cascade
        on update cascade,
    created_at datetime not null default now()
);

drop table if exists posts;
create table posts(
    id int primary key auto_increment,
    title varchar(200) not null,
    description varchar(200) not null,
	lat varchar(100),
    lon varchar(100),
    created_at datetime not null default now(),
    updated_at datetime not null default now(),
	user_id int default 1,
    foreign key (user_id) references users(id)    
        on delete cascade
        on update cascade);

drop table if exists reportados;
create table reportados(
    id int primary key auto_increment,
    user_report varchar(100),
    post_report varchar(100),
	user_id int not null,
    foreign key (user_id) references users(id)
		on delete cascade
        on update cascade,
    post_id int not null ,
    foreign key (post_id) references posts(id)
		on delete cascade
        on update cascade,
    created_at datetime not null default now()
);

drop table if exists attachments;
create table attachments(
    id int primary key auto_increment,
    location varchar(200) not null,
    created_at datetime not null default now()
);



drop table if exists post_attachments;
create table post_attachments(
    id int primary key auto_increment,
    post_id int not null ,
    foreign key (post_id) references posts(id)
        on delete cascade
        on update cascade,
    attachment_id int not null,
    foreign key (attachment_id) references  attachments(id)
        on delete cascade
        on update cascade
);

drop table if exists comments;
create table comments(
    id int primary key auto_increment,
    text varchar(600) not null,
    user_id int not null,
    foreign key (user_id) references users(id)
        on delete cascade
        on update cascade,
    post_id int not null ,
    foreign key (post_id) references posts(id)
        on delete cascade
        on update cascade,
    approved tinyint(1) default 0,
    created_at datetime not null default now(),
    updated_at datetime not null default now()
);

insert into roles(name) values('admin');
insert into users(username,email,contrasena) values('pep','assd@swdw',1515);

delimiter $$ 
create trigger contadorUsers before insert on users for each row
begin 
	declare numUsers int;
    select count(*) 
    into numUsers 
    from users;
    
    if numUsers < 5 then
		select "Hay menos de 5 usuarios";
		else 
		select "Hay 5 usuarios o más";
    end if;
end $$

create trigger idFijo before update on users for each row
begin 
	if new.id is not null then 
    signal sqlstate '45000' set message_text = "El id se genera automáticamente y no se puede modificar.";
    end if;
end $$

create trigger usuarioMinimo before delete on users for each row
begin 
	declare numUsers int;
    select count(*) 
    into numUsers 
    from users;
    
    if numUsers = 1 then 
		signal sqlstate '45000' set message_text = "No se puede eliminar el último usuario";
	end if;
end $$