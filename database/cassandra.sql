create table artists (artistid int primary key,
...  artistname varchar, bio varchar, followed boolean, verfied boolean, followers int, images list<text>, cities map<text,int>);

COPY test FROM 'c:/Users/gao10/Documents/hackReactor/SDC/Header/database/CSV-data/cassData-1.csv' WITH DELIMITER=',' AND HEADER=TRUE;


12811
10946