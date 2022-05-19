create database taska;

create table pessoa(
id serial primary key,
nome varchar(255) not null,
avatar text
);

create table usuario(
id serial primary key,
username varchar(100) not null,
senha text not null,
id_pessoa integer not null, 
constraint fk_pessoa_usuario FOREIGN KEY(id_pessoa) REFERENCES pessoa(id)
);

create table rotulo (
id serial primary key, 
descricao varchar(30) not null,
icon varchar(30),
color varchar(20),
id_usuario integer not null,
constraint fk_usuario_rotulo FOREIGN KEY(id_usuario) REFERENCES usuario(id)
);

create table situacao(
id serial primary key,
descricao varchar(20) not null
);

create table atividade(
id serial primary key,
titulo varchar(255) not null,
descricao text not null,
data_inicio timestamp not null,
data_fim timestamp,
id_situacao integer not null,
id_rotulo integer not null,
id_usuario integer not null,
constraint fk_situacao_atividade FOREIGN KEY(id_situacao) REFERENCES situacao(id),
constraint fk_rotulo_atividade FOREIGN KEY(id_rotulo) REFERENCES rotulo(id),
constraint fk_usuario_atividade FOREIGN KEY(id_usuario) REFERENCES usuario(id)
);
