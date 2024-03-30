CREATE SCHEMA IF NOT EXISTS "System"
    AUTHORIZATION postgres;

select * from "System"."Menu"
select * from "System"."Catalog"
select * from "System"."CatalogDetail"
--drop table "System"."Menu"

CREATE TABLE "System"."Menu" (
    Id INT GENERATED ALWAYS AS IDENTITY,
    Icon VARCHAR(100) NOT NULL,
    Title VARCHAR(100) NOT NULL,
	Url VARCHAR(100) NOT NULL,
	Rol VARCHAR(100) NOT NULL,
	ParentId INT NOT NULL,
	IsDeleted Boolean NOT NULL,
	CreateDate DATE NOT NULL
	PRIMARY KEY(Id)
);

CREATE TABLE "System"."Catalog" (
Id SERIAL PRIMARY KEY,
CatKey VARCHAR(100) NOT NULL,
CatName VARCHAR(150) NOT NULL,
IsDeleted Boolean NOT NULL,
CreateDate DATE NOT NULL
)

--drop table "System"."CatalogDetail"

CREATE TABLE "System"."CatalogDetail" (
Id INT GENERATED ALWAYS AS IDENTITY,
CatId INT NOT NULL,
CatDetKey VARCHAR(100)  NULL,
CatDetName VARCHAR(200) NOT NULL,
IsDeleted Boolean NOT NULL,
CreateDate DATE NOT NULL,
	PRIMARY KEY(Id),
	CONSTRAINT fk_Catalog
	FOREIGN KEY(CatId)
	REFERENCES "System"."Catalog"(Id)
	)

INSERT INTO "System"."Catalog" (catkey,catname,isdeleted,createdate) 
VALUES ('TEST', 'Prueba', '0',Now())


INSERT INTO "System"."CatalogDetail" (catid,catdetkey,catdetname,isdeleted,createdate) 
VALUES (1,null, 'Registro prueba', '0',Now())


SELECT NOW();

select * from "System"."Menu" where isdeleted=false

--INSERT INTO "System"."Menu" (icon,title,url,rol,parentid,isdeleted,createdate) 
--VALUES ('dashboard', 'Inicio', '/','Administrador',0,'0',Now())

--INSERT INTO "System"."Menu" (icon,title,url,rol,parentid,isdeleted,createdate) 
--VALUES 
--('fa-solid fa-lock', 'Seguridad', '/','Administrador,Presidente',1,'0',Now()),
--('fa-solid fa-users', 'Gestión Usuarios', '/app/Usuarios','Administrador,Presidente',2,'0',Now());
   
--insert into "System"."Menu" (Icon,Title,Url,Rol,ParentId,IsDeleted,CreateDate)
--values('dashboard','Inicio','/','Administrador',0,0,NOW());

insert into "System"."Menu" (Icon,Title,Url,Rol,ParentId,IsDeleted,CreateDate)
values('fa-solid fa-clipboard-list','Gestión de catalogos','/','Administrador',1,'0',NOW());

insert into "System"."Menu" (Icon,Title,Url,Rol,ParentId,IsDeleted,CreateDate)
values('fa-regular fa-rectangle-list','Catalogo','/','Administrador',4,'0',NOW());
insert into "System"."Menu" (Icon,Title,Url,Rol,ParentId,IsDeleted,CreateDate)
values('fa-solid fa-list-check','Catalogo detalle','/','Administrador',4,'0',NOW());

--update "System"."Menu" set url='/app/system/catalog' where id=5

