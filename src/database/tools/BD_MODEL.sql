CREATE TABLE tbl_user (
 email VARCHAR(250) NOT NULL,
 fistname VARCHAR(250) NOT NULL,
 lastname VARCHAR(250) NOT NULL,
 token VARCHAR(5000),
 id_status INTEGER NOT NULL DEFAULT 1,
 id_tipouser INTEGER NOT NULL,
 id_org INTEGER,
 photoprofile VARCHAR(1000),
 capacidade INTEGER,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL
);


ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_pkey PRIMARY KEY (email);

CREATE TABLE tbl_servicos (
 id BIGSERIAL,
 path VARCHAR(5000) NOT NULL,
 name VARCHAR(100) NOT NULL,
 componente VARCHAR(100) NOT NULL,
 icone VARCHAR(250) NOT NULL,
 id_org INTEGER NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL
);


ALTER TABLE tbl_servicos ADD CONSTRAINT tbl_servicos_pkey PRIMARY KEY (id);

CREATE TABLE tbl_rel_user_vs_servicos (
 email_user VARCHAR(500) NOT NULL,
 id_servicos INTEGER NOT NULL
);


ALTER TABLE tbl_rel_user_vs_servicos ADD CONSTRAINT tbl_rel_user_vs_servicos_pkey PRIMARY KEY (email_user, id_servicos);

CREATE TABLE tbl_org (
 id INTEGER NOT NULL,
 nomeorg VARCHAR(1000) NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL
);


ALTER TABLE tbl_org ADD CONSTRAINT tbl_org_pkey PRIMARY KEY (id);

CREATE TABLE tbl_tipo_user (
 id BIGSERIAL,
 desctipouser VARCHAR(1000) NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL
);


ALTER TABLE tbl_tipo_user ADD CONSTRAINT tbl_tipo_user_pkey PRIMARY KEY (id);

CREATE TABLE tbl_status (
 id BIGSERIAL,
 descstatus VARCHAR NOT NULL,
 created_at DATE NOT NULL,
 updated_at DATE NOT NULL
);


ALTER TABLE tbl_status ADD CONSTRAINT tbl_status_pkey PRIMARY KEY (id);

CREATE TABLE tbl_produtos (
 id BIGSERIAL,
 produtcname VARCHAR(1000) NOT NULL,
 poductsubhead VARCHAR(5000) NOT NULL,
 img1 VARCHAR(5000) NOT NULL,
 img2 VARCHAR(5000),
 img3 VARCHAR(5000),
 produtcdescription1 VARCHAR(10000) NOT NULL,
 produtcdescription2 VARCHAR(5000),
 produtcdescription3 VARCHAR(5000),
 pixelfacebook VARCHAR(200),
 googleanalitic VARCHAR(300),
 whatsvendedor VARCHAR(5000) NOT NULL,
 statusprodutc VARCHAR(500) NOT NULL,
 linkbuy VARCHAR NOT NULL,
 price VARCHAR(500) NOT NULL,
 linkpage VARCHAR(1000) NOT NULL,
 email_user VARCHAR(500) NOT NULL
);


ALTER TABLE tbl_produtos ADD CONSTRAINT tbl_produtos_pkey PRIMARY KEY (id, email_user);

CREATE TABLE tbl_comentario (
 id INTEGER NOT NULL,
 id_produto INTEGER NOT NULL,
 comentario VARCHAR(5000) NOT NULL,
 created_at DATE NOT NULL
);


ALTER TABLE tbl_comentario ADD CONSTRAINT tbl_comentario_pkey PRIMARY KEY (id);

ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_id_status_fkey FOREIGN KEY (id_status) REFERENCES tbl_status(id);
ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_id_tipouser_fkey FOREIGN KEY (id_tipouser) REFERENCES tbl_tipo_user(id);
ALTER TABLE tbl_user ADD CONSTRAINT tbl_user_id_org_fkey FOREIGN KEY (id_org) REFERENCES tbl_org(id);
ALTER TABLE tbl_servicos ADD CONSTRAINT tbl_servicos_id_org_fkey FOREIGN KEY (id_org) REFERENCES tbl_org(id);
ALTER TABLE tbl_rel_user_vs_servicos ADD CONSTRAINT tbl_rel_user_vs_servicos_email_user_fkey FOREIGN KEY (email_user) REFERENCES tbl_user(email);
ALTER TABLE tbl_rel_user_vs_servicos ADD CONSTRAINT tbl_rel_user_vs_servicos_id_servicos_fkey FOREIGN KEY (id_servicos) REFERENCES tbl_servicos(id);
ALTER TABLE tbl_produtos ADD CONSTRAINT tbl_produtos_email_user_fkey FOREIGN KEY (email_user) REFERENCES tbl_user(email);




DELETE FROM public.tbl_rel_user_vs_servicos;
DELETE FROM public.tbl_servicos;
DELETE FROM public.tbl_user;
DELETE FROM public.tbl_org;
DELETE FROM public.tbl_tipo_user;
DELETE FROM public.tbl_status;



INSERT INTO public.tbl_status(
	id, descstatus, created_at, updated_at)
	VALUES 	(1, 'Ativo', '03/01/2021', '03/01/2021'),
			(2, 'Ativo', '03/01/2021', '03/01/2021')
;

INSERT INTO public.tbl_tipo_user(
	id, desctipouser, created_at, updated_at)
	VALUES 	(1, 'Adim', '03/01/2021', '03/01/2021'),
			(2, 'Others', '03/01/2021', '03/01/2021')
;

INSERT INTO public.tbl_org(
	id, nomeorg, created_at, updated_at)
	VALUES 	(1, 'Gestão de Produtos', '03/01/2021', '03/01/2021'),
			(2, 'Gestão pessoal', '03/01/2021', '03/01/2021')
;

INSERT INTO public.tbl_servicos(
	id, path, name, componente, icone, id_org, created_at, updated_at)
	VALUES 	(1, '/Painel/CriarProd','BlankPage', 'BlankPage', '', 1,  '03/01/2021', '03/01/2021')
;

INSERT INTO public.tbl_user(
	email, fistname, lastname, token, id_status, id_tipouser, id_org, capacidade, created_at, updated_at)
	VALUES 	('pedropaduelo@gmail.com', 'Myke', 'Pedro Paduelo', '', 1, 1, 1, 1, '03/01/2021', '03/01/2021'),
			('maruan.hamdan@gmail.com', 'Maruan', 'Hamdan', '', 1, 1, 1, 1, '03/01/2021', '03/01/2021')
;



CREATE OR REPLACE VIEW view_users AS
SELECT 
    tbl_user.email,
	tbl_user.fistname,
	tbl_user.lastname,

	tbl_user.id_status,
	tbl_user.id_tipouser,
	tbl_user.id_org,

	tbl_user.token,
	tbl_user.photoprofile,

	tbl_status.descstatus,
	tbl_tipo_user.desctipouser,
	tbl_org.nomeorg,

	tbl_user.created_at,
	tbl_user.updated_at,
	tbl_user.capacidade
	
FROM tbl_user 
	left join tbl_tipo_user on tbl_user.id_tipouser = tbl_tipo_user.id
	left join tbl_status on tbl_user.id_status = tbl_status.id
	left join tbl_org on tbl_org.id = tbl_user.id_org
;

CREATE OR REPLACE VIEW view_rel_user_vs_servicos AS
SELECT 

	tbl_rel_user_vs_servicos.id_servicos,
	tbl_rel_user_vs_servicos.email_user,

	tbl_servicos.path,
	tbl_servicos.name,
	tbl_servicos.componente,
	tbl_servicos.icone,

	view_users.fistname,
	view_users.lastname,

	view_users.descstatus,
	view_users.desctipouser,
	view_users.nomeorg

FROM tbl_rel_user_vs_servicos 

	left join view_users on view_users.email = email_user
	left join tbl_servicos on tbl_servicos.id = id_servicos
;










-- INSERT INTO public.tbl_planos(
-- 	id, id_app, title, subheader, price, buttontext, buttonvariant)
-- 	VALUES 	(1,2,'Free','',0,'Sign up for free','outlined'),
-- 			(2,2,'Pro','Most popular',30,'Get started','contained'),
-- 			(3,2,'Enterprise','',90,'Contact us','outlined')
-- ;

-- INSERT INTO public.tbl_description(
-- 	id, namedescription, id_palnos)
-- 	VALUES 	(1,'10 users included',1),
-- 			(2,'2 GB of storage',1),
-- 			(3,'Help center access',1),
-- 			(4,'Email support',1),
-- 			(5,'20 users included',2),
-- 			(6,'10 GB of storage',2),
-- 			(7,'Help center access',2),
-- 			(8,'Priority email support',2),
-- 			(9,'50 users included',3),
-- 			(10,'30 GB of storage',3),
-- 			(11,'Help center access',3),
-- 			(12,'Phone & email support',3)
-- ;











