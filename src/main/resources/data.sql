INSERT INTO role(name) VALUES('ROLE_USER');
INSERT INTO role(name) VALUES('ROLE_MODERATOR');
INSERT INTO role(name) VALUES('ROLE_ADMIN');

insert into users(id, username, email, password)
values(99999999, 'admin', 'admin99@gmail.com',
       '$2y$12$DQtMW81NbGTmaIDtEhjTP.mJ3qNYOOhtm07dkRRbZRZjnamwZhqHq');

insert into users(id, username, email, password)
values(100000000, 'user1', 'user1@gmail.com',
       '$2y$12$DQtMW81NbGTmaIDtEhjTP.mJ3qNYOOhtm07dkRRbZRZjnamwZhqHq');

insert into todo(id, description, target_date, is_done, user_id)
values(10001, 'Learn JPA', now(), false, 99999999);

insert into todo(id, description, target_date, is_done, user_id)
values(10002, 'Read book', now(), false, 99999999);

insert into todo(id, description, target_date, is_done, user_id)
values(10003, 'wake up at 6 am everyday', now(), false, 99999999);

insert into todo(id, description, target_date, is_done, user_id)
values(10004, 'become good developer', now(), false, 100000000);

insert into todo(id, description, target_date, is_done, user_id)
values(10005, 'wake up earlier', now(), false, 100000000);

insert into todo(id, description, target_date, is_done, user_id)
values(10006, 'fix the inside rotation in right shoulder', now(), false, 100000000);

insert into user_role(user_id, role_id)
values(99999999, 3);

insert into user_role(user_id, role_id)
values(100000000, 1);




