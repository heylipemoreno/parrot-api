create database parrot;
use parrot;

create table user (
	idUser int not null auto_increment primary key unique,
    nome varchar(70) null default null,
    email varchar(45) null default null,
	apartment int null default null,
    senha varchar(120) null default null,
    created_at timestamp null default null,
    updated_at timestamp null default null 
);
create table post (
	idPost int not null auto_increment primary key unique,
    content text null default null,
    created_at timestamp null default null,
    updated_at timestamp null default null,
    user_id int not null,
    constraint post_user foreign key (user_id) references user(idUser)
);

insert into user values
	(null, 'Joao', 'joao@gmail.com', 101, 'joao101', null, null),
    (null, 'Maria', 'maria@gmail.com', 102, 'maria102', null, null),
    (null, 'Miguel', 'miguel@gmail.com', 103, 'miguel103', null, null),
    (null, 'Helena', 'helena@gmail.com', 104, 'helena104', null, null),
    (null, 'Arthur', 'arthur@gmail.com', 105, 'arthur105', null, null);
    
insert into post values
	(null, 'A festa foi demais', '2022-11-25', '2022-11-26', 1),
    (null, 'Amamos a festa', '2022-11-25', '2022-11-26', 2);