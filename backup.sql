--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10 (Debian 15.10-1.pgdg120+1)
-- Dumped by pg_dump version 15.10 (Debian 15.10-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorias; Type: TABLE; Schema: public; Owner: kiosco
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL
);


ALTER TABLE public.categorias OWNER TO kiosco;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: kiosco
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categorias_id_seq OWNER TO kiosco;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kiosco
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: historial_venta; Type: TABLE; Schema: public; Owner: kiosco
--

CREATE TABLE public.historial_venta (
    id integer NOT NULL,
    comprador integer,
    fecha_venta date NOT NULL,
    lista_prod integer[],
    forma_pago character varying(50) NOT NULL,
    descuento integer,
    total integer NOT NULL
);


ALTER TABLE public.historial_venta OWNER TO kiosco;

--
-- Name: historial_venta_id_seq; Type: SEQUENCE; Schema: public; Owner: kiosco
--

CREATE SEQUENCE public.historial_venta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.historial_venta_id_seq OWNER TO kiosco;

--
-- Name: historial_venta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kiosco
--

ALTER SEQUENCE public.historial_venta_id_seq OWNED BY public.historial_venta.id;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: kiosco
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    precio integer NOT NULL,
    stock integer,
    descripcion character varying(150) NOT NULL,
    nacional boolean NOT NULL,
    categoria integer
);


ALTER TABLE public.productos OWNER TO kiosco;

--
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: kiosco
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_seq OWNER TO kiosco;

--
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kiosco
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: kiosco
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    edad integer NOT NULL,
    mail character varying(50) NOT NULL,
    nro_telefono character varying(14) NOT NULL,
    dni integer NOT NULL,
    es_empleado boolean NOT NULL
);


ALTER TABLE public.usuarios OWNER TO kiosco;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: kiosco
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO kiosco;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kiosco
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: historial_venta id; Type: DEFAULT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.historial_venta ALTER COLUMN id SET DEFAULT nextval('public.historial_venta_id_seq'::regclass);


--
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: kiosco
--

COPY public.categorias (id, nombre) FROM stdin;
1	Bebidas
2	Golosinas
3	Salado
4	Dulce
5	Legumbres
6	Arroz
\.


--
-- Data for Name: historial_venta; Type: TABLE DATA; Schema: public; Owner: kiosco
--

COPY public.historial_venta (id, comprador, fecha_venta, lista_prod, forma_pago, descuento, total) FROM stdin;
1	3	2025-01-13	{4,7,13}	credito	\N	1150
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: kiosco
--

COPY public.productos (id, nombre, precio, stock, descripcion, nacional, categoria) FROM stdin;
1	Alfajor de chocolate	400	50	Alfajor de chocolate relleno con dulce de leche	t	4
2	Papas fritas clásicas	700	30	Bolsa de papas fritas sabor original	f	3
3	Gaseosa cola 500ml	600	40	Botella de gaseosa sabor cola de 500ml	t	1
4	Maní con cáscara	300	20	Maní tostado con cáscara	t	3
5	Arroz blanco largo fino	500	25	Paquete de arroz blanco de 1kg	f	6
6	Tableta de chocolate	800	15	Chocolate con leche de 100g	f	4
7	Galletas saladas	450	35	Paquete de galletas saladas de 200g	t	3
8	Jugo de naranja 1L	900	20	Jugo natural de naranja en botella de 1L	t	1
9	Lentejas secas	450	18	Bolsa de lentejas de 500g	t	5
10	Arroz integral	550	10	Paquete de arroz integral de 1kg	t	6
11	Caramelos surtidos	200	100	Caramelos de diferentes sabores	t	2
12	Snack de queso	500	40	Snacks sabor queso	f	3
13	Agua mineral 500ml	400	50	Botella de agua mineral de 500ml	t	1
14	Porotos negros	480	15	Bolsa de porotos negros de 500g	f	5
15	Arroz saborizado	600	12	Paquete de arroz con condimentos de 1kg	t	6
16	Turrón de maní	250	80	Turrón dulce con base de maní	t	2
17	Palitos salados	400	60	Palitos salados crujientes	t	3
18	Gaseosa lima-limón 500ml	580	50	Botella de gaseosa sabor lima-limón de 500ml	f	1
19	Garbanzos secos	500	25	Bolsa de garbanzos de 500g	t	5
20	Arroz doble Carolina	650	20	Arroz blanco de grano grande, 1kg	t	6
21	Chocolate amargo 70%	900	15	Tableta de chocolate amargo 70% cacao, 100g	f	4
22	Cereales saborizados	600	25	Cereal crocante sabor miel, 300g	t	4
23	Jugo multifruta 1L	850	30	Botella de jugo sabor multifruta, 1L	t	1
24	Lentejas partidas	420	18	Lentejas partidas para guiso, 500g	t	5
25	Arroz Yamani	700	12	Arroz integral tipo Yamani, 1kg	f	6
26	Gomitas de fruta	300	100	Bolsa de gomitas sabor fruta, 150g	t	2
27	Chizitos	550	40	Snacks de maíz sabor queso, 100g	t	3
28	Energizante 250ml	750	30	Lata de bebida energizante, 250ml	f	1
29	Porotos colorados	480	20	Bolsa de porotos colorados, 500g	t	5
30	Arroz con vegetales	750	15	Paquete de arroz con mezcla de vegetales, 1kg	t	5
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: kiosco
--

COPY public.usuarios (id, nombre, edad, mail, nro_telefono, dni, es_empleado) FROM stdin;
1	Jaime	37	jaimito_adm@gmail.com	38559078	37890432	t
2	Rosa	53	rosa_maravillosa@gmail.com	67859040	31786943	f
3	Hector	30	hectorramos@gmail.com	56432568	40876345	f
\.


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kiosco
--

SELECT pg_catalog.setval('public.categorias_id_seq', 1, false);


--
-- Name: historial_venta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kiosco
--

SELECT pg_catalog.setval('public.historial_venta_id_seq', 1, false);


--
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kiosco
--

SELECT pg_catalog.setval('public.productos_id_seq', 1, false);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kiosco
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, false);


--
-- Name: categorias categorias_nombre_key; Type: CONSTRAINT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: historial_venta historial_venta_pkey; Type: CONSTRAINT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.historial_venta
    ADD CONSTRAINT historial_venta_pkey PRIMARY KEY (id);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: historial_venta historial_venta_comprador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.historial_venta
    ADD CONSTRAINT historial_venta_comprador_fkey FOREIGN KEY (comprador) REFERENCES public.usuarios(id);


--
-- Name: productos productos_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kiosco
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_categoria_fkey FOREIGN KEY (categoria) REFERENCES public.categorias(id);


--
-- PostgreSQL database dump complete
--

