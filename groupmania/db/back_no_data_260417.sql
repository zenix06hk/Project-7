--
-- PostgreSQL database dump
--

\restrict gp4IjaeGTFwomEm4fAskITcm5xZRgHfTbELmQzmT9xFSMcY7rvUG6ZJOLlavSzs

-- Dumped from database version 17.7
-- Dumped by pg_dump version 18.0

-- Started on 2026-04-17 19:44:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 221 (class 1259 OID 32838)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    comment_id bigint NOT NULL,
    comment_content character varying NOT NULL,
    comment_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id bigint,
    post_id bigint
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32837)
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_comment_id_seq OWNER TO postgres;

--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 220
-- Name: comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_comment_id_seq OWNED BY public.comment.comment_id;


--
-- TOC entry 217 (class 1259 OID 24596)
-- Name: id-increment; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."id-increment"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."id-increment" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 41085)
-- Name: popularity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.popularity (
    popularity_id bigint NOT NULL,
    user_id bigint,
    post_id bigint,
    likes bigint,
    dislikes bigint
);


ALTER TABLE public.popularity OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 41090)
-- Name: popularity_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.popularity_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 654321658582
    CACHE 1;


ALTER SEQUENCE public.popularity_id OWNER TO postgres;

--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 223
-- Name: popularity_id; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.popularity_id OWNED BY public.popularity.popularity_id;


--
-- TOC entry 224 (class 1259 OID 49296)
-- Name: post_id_increment; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_id_increment
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_id_increment OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32828)
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    user_id bigint,
    post_content character varying NOT NULL,
    post_img character varying,
    post_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    likes integer,
    dislikes integer,
    post_id bigint DEFAULT nextval('public.post_id_increment'::regclass) NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 32805)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    user_id bigint DEFAULT nextval('public."id-increment"'::regclass) NOT NULL,
    avatar character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4713 (class 2604 OID 32893)
-- Name: comment comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN comment_id SET DEFAULT nextval('public.comment_comment_id_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 41091)
-- Name: popularity popularity_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.popularity ALTER COLUMN popularity_id SET DEFAULT nextval('public.popularity_id'::regclass);


--
-- TOC entry 4875 (class 0 OID 32838)
-- Dependencies: 221
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (comment_id, comment_content, comment_time, user_id, post_id) FROM stdin;
47	jasdklfjhk	2026-04-17 19:16:59.418363	27	1
48	asdfklj	2026-04-17 19:17:34.943078	27	2
49	3rd comment	2026-04-17 19:21:17.109291	27	3
50	4th comment	2026-04-17 19:26:22.56564	27	4
51	5th comment	2026-04-17 19:26:53.042316	27	5
52	test comment	2026-04-17 19:32:08.01488	27	6
\.


--
-- TOC entry 4876 (class 0 OID 41085)
-- Dependencies: 222
-- Data for Name: popularity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.popularity (popularity_id, user_id, post_id, likes, dislikes) FROM stdin;
59	27	31	1	0
63	27	32	0	0
65	27	2	0	0
\.


--
-- TOC entry 4873 (class 0 OID 32828)
-- Dependencies: 219
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (user_id, post_content, post_img, post_time, likes, dislikes, post_id) FROM stdin;
27	1st post	\N	2026-04-17 19:16:48.178604	0	0	1
27	2nd psot	\N	2026-04-17 19:17:16.942683	0	0	2
27	3rd post	\N	2026-04-17 19:21:10.220827	0	0	3
27	4th post	\N	2026-04-17 19:26:15.782085	0	0	4
27	5th post	\N	2026-04-17 19:26:46.050109	0	0	5
27	quick post	\N	2026-04-17 19:32:02.4633	0	0	6
\.


--
-- TOC entry 4872 (class 0 OID 32805)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (username, first_name, last_name, email, password, user_id, avatar) FROM stdin;
calwill	Calvin	Will	calwill@aol.com	$2b$10$QPF/OhRGIK5xMWPgt/86aeG3a0lXgKQFXu1cPx.PWz1i9.oatqTbu	27	WhatsApp_Image_2024-12-09_at_201775822393560.jpg
\.


--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 220
-- Name: comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_comment_id_seq', 52, true);


--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 217
-- Name: id-increment; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."id-increment"', 27, true);


--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 223
-- Name: popularity_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.popularity_id', 65, true);


--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 224
-- Name: post_id_increment; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_id_increment', 6, true);


--
-- TOC entry 4723 (class 2606 OID 32895)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 4725 (class 2606 OID 41089)
-- Name: popularity popularity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.popularity
    ADD CONSTRAINT popularity_pkey PRIMARY KEY (popularity_id);


--
-- TOC entry 4721 (class 2606 OID 49295)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- TOC entry 4717 (class 2606 OID 32814)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4719 (class 2606 OID 32873)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


-- Completed on 2026-04-17 19:44:01

--
-- PostgreSQL database dump complete
--

\unrestrict gp4IjaeGTFwomEm4fAskITcm5xZRgHfTbELmQzmT9xFSMcY7rvUG6ZJOLlavSzs

