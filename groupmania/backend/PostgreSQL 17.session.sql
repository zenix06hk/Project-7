select *
from comment

select *
from users


INSERT INTO comment (comment_id, user_id, post_id, comment_content, comment_time)
VALUES (1, 1, 1, 'This is a test comment.', NOW());

INSERT INTO users (username, first_name, last_name, email, password, avatar)
VALUES ('peter_smith', 'peter', 'smith', 'petersmith@aol.com', 123456, 'peter.jpg' )