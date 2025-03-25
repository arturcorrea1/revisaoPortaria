create database revisao_guarita;
use revisao_guarita;

create table moradores(
	id int auto_increment primary key,
    nome varchar(45) not null,
    bloco enum('A','B','C'),
    apartamento enum('A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'),
    telefone varchar(11) not null unique,
    email varchar(255) not null unique,
    status enum('residente', 'visitante'),
    criado_em timestamp
);
 
create table veiculo(
	id_carro int primary key auto_increment,
    placa varchar(7) unique not null,
    modelo varchar(255) not null,
    id_morador int not null,
    vaga varchar(10) not null unique,
    foreign key (id_morador) references moradores(id)
);