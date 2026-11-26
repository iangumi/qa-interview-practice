begin;

create schema if not exists interview_radar;
revoke all on schema interview_radar from public, anon, authenticated;

create table interview_radar.prompts (
  question_id integer primary key,
  group_id integer not null references interview_radar.prompts(question_id)
);

create table interview_radar.reports (
  reporter uuid not null references auth.users(id) on delete cascade,
  group_id integer not null references interview_radar.prompts(question_id),
  role text check (role in ('junior', 'sdet', 'lead', 'other')),
  reported_at timestamptz not null default now(),
  withdrawn boolean not null default false,
  primary key (reporter, group_id)
);
create index radar_active_reports on interview_radar.reports (reported_at, group_id)
  where not withdrawn;
alter table interview_radar.prompts enable row level security;
alter table interview_radar.reports enable row level security;
revoke all on all tables in schema interview_radar from public, anon, authenticated;

create function public.interview_radar_summary(p_role text default null)
returns table (group_id integer, reports integer, last_reported date)
language sql stable security definer set search_path = ''
as $$
  select r.group_id, count(*)::integer,
         max((r.reported_at at time zone 'UTC')::date)
  from interview_radar.reports r
  where not r.withdrawn and r.reported_at >= now() - interval '90 days'
    and (p_role is null or r.role = p_role)
  group by r.group_id
  having count(*) >= 5;
$$;

create function public.interview_radar_mine()
returns table (group_id integer)
language sql stable security definer set search_path = ''
as $$
  select r.group_id from interview_radar.reports r
  where r.reporter = auth.uid() and not r.withdrawn
    and r.reported_at >= now() - interval '90 days';
$$;

create function public.interview_radar_set(p_question integer, p_report boolean, p_role text default null)
returns void language plpgsql security definer set search_path = ''
as $$
declare
  voter uuid := auth.uid();
  canonical integer;
  previous interview_radar.reports%rowtype;
begin
  if voter is null or not exists (
    select 1 from auth.users u where u.id = voter and u.email_confirmed_at is not null
  ) then
    raise exception using errcode = '42501', message = 'A verified email is required.';
  end if;
  if p_report is null or (p_role is not null and p_role not in ('junior', 'sdet', 'lead', 'other')) then
    raise exception using errcode = '22023', message = 'Invalid report details.';
  end if;
  select p.group_id into canonical from interview_radar.prompts p where p.question_id = p_question;
  if canonical is null then
    raise exception using errcode = '22023', message = 'Unknown question.';
  end if;

  -- Serialize a voter's mutations so duplicate submissions and the daily cap are consistent.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('interview-radar:' || voter::text, 0));
  select * into previous from interview_radar.reports r
    where r.reporter = voter and r.group_id = canonical;
  if not p_report then
    update interview_radar.reports set withdrawn = true
      where reporter = voter and group_id = canonical;
  elsif previous.reported_at >= now() - interval '90 days' then
    -- Undo followed by re-reporting preserves the original date and role.
    if previous.withdrawn then
      update interview_radar.reports set withdrawn = false
        where reporter = voter and group_id = canonical;
    end if;
  else
    if (select count(*) from interview_radar.reports r
        where r.reporter = voter and r.reported_at >= now() - interval '1 day') >= 25 then
      raise sqlstate 'PT429' using message = 'You can report up to 25 new questions per day.';
    end if;
    insert into interview_radar.reports (reporter, group_id, role)
      values (voter, canonical, p_role)
      on conflict (reporter, group_id)
      do update set role = excluded.role, reported_at = excluded.reported_at, withdrawn = false;
  end if;
end;
$$;

revoke all on function public.interview_radar_summary(text) from public, anon, authenticated;
revoke all on function public.interview_radar_mine() from public, anon, authenticated;
revoke all on function public.interview_radar_set(integer, boolean, text) from public, anon, authenticated;
grant execute on function public.interview_radar_summary(text) to anon, authenticated;
grant execute on function public.interview_radar_mine() to authenticated;
grant execute on function public.interview_radar_set(integer, boolean, text) to authenticated;

insert into interview_radar.prompts (question_id, group_id) values
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 6),
  (7, 7),
  (8, 8),
  (9, 9),
  (10, 10),
  (11, 11),
  (12, 12),
  (13, 13),
  (14, 14),
  (15, 15),
  (16, 16),
  (17, 17),
  (18, 18),
  (19, 19),
  (20, 20),
  (21, 21),
  (22, 22),
  (23, 23),
  (24, 19),
  (25, 25),
  (26, 26),
  (27, 27),
  (28, 28),
  (29, 29),
  (30, 30),
  (31, 31),
  (32, 32),
  (33, 33),
  (34, 34),
  (35, 35),
  (36, 36),
  (37, 37),
  (38, 38),
  (39, 39),
  (40, 40),
  (41, 41),
  (42, 20),
  (43, 43),
  (44, 44),
  (45, 45),
  (46, 46),
  (47, 47),
  (48, 48),
  (49, 49),
  (50, 50),
  (51, 51),
  (52, 52),
  (53, 53),
  (54, 54),
  (55, 55),
  (56, 56),
  (57, 57),
  (58, 58),
  (59, 59),
  (60, 60),
  (61, 61),
  (62, 62),
  (63, 63),
  (64, 64),
  (65, 65),
  (66, 66),
  (67, 67),
  (68, 68),
  (69, 69),
  (70, 70),
  (71, 71),
  (72, 72),
  (73, 58),
  (74, 74),
  (75, 75),
  (76, 76),
  (77, 77),
  (78, 78),
  (79, 79),
  (80, 80),
  (81, 81),
  (82, 82),
  (83, 83),
  (84, 84),
  (85, 85),
  (86, 86),
  (87, 87),
  (88, 88),
  (89, 89),
  (90, 90),
  (91, 91),
  (92, 92),
  (93, 93),
  (94, 94),
  (95, 95),
  (96, 96),
  (97, 97),
  (98, 98),
  (99, 99),
  (100, 100),
  (101, 101),
  (102, 102),
  (103, 103),
  (104, 104),
  (105, 105),
  (106, 106),
  (107, 107),
  (108, 108),
  (109, 109),
  (110, 110),
  (111, 111),
  (112, 112),
  (113, 113),
  (114, 114),
  (115, 115),
  (116, 116),
  (117, 117),
  (118, 118),
  (119, 119),
  (120, 120),
  (121, 121),
  (122, 122),
  (123, 123),
  (124, 124),
  (125, 125),
  (126, 126),
  (127, 127),
  (128, 128),
  (129, 129),
  (130, 130),
  (131, 131),
  (132, 71),
  (133, 133),
  (134, 134),
  (135, 135),
  (136, 136),
  (137, 137),
  (138, 138),
  (139, 139),
  (140, 140),
  (141, 141),
  (142, 142),
  (143, 143),
  (144, 144),
  (145, 145),
  (146, 146),
  (147, 147),
  (148, 148),
  (149, 149),
  (150, 150),
  (151, 151),
  (152, 152),
  (153, 153),
  (154, 154),
  (155, 155),
  (156, 156),
  (157, 157),
  (158, 158),
  (159, 159),
  (160, 160),
  (161, 161);

commit;
