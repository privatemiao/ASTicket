SELECT a.* FROM D101_TRAIN_DIR_DAY a WHERE a.TRAIN_CODE = 'G1214' ;
SELECT  a.STATION_TRAIN_CODE, a.* FROM D101_STOP_TIME_DAY a WHERE a.STATION_TRAIN_CODE = 'G1214';


SELECT distinct
        std1.id as board_id,
        std1.train_dir_day_id as
        board_train_dir_day_id,
        std1.travel_date as board_travel_date,
        std1.station_train_code as board_station_train_code,
        std1.station_code
        as board_station_code,
        std1.station_no as board_station_no,
        std1.different_day as board_different_day,
        std1.board_time as
        board_board_time,
        std1.arrival_time as board_arrival_time,
        std1.delay_minutes as board_delay_minutes,
        std2.id as arrival_id,
        std2.train_dir_day_id as arrival_train_dir_day_id,
        std2.travel_date as
        arrival_travel_date,
        std2.station_train_code as
        arrival_station_train_code,
        std2.station_code as arrival_station_code,
        std2.station_no as arrival_station_no,
        std2.different_day as
        arrival_different_day,
        std2.board_time as arrival_board_time,
        std2.arrival_time as arrival_arrival_time,
        std2.delay_minutes as
        arrival_delay_minutes,
        tdd.id as tdd_id,
        tdd.train_id as tdd_train_id,
        tdd.start_train_date as tdd_start_train_date,
        tdd.train_code as
        tdd_train_code,
        tdd.train_type_code as tdd_train_type_code,
        tdd.train_class_code as tdd_train_class_code
        FROM D101_STOP_TIME_DAY
        std1, D101_STOP_TIME_DAY std2, D101_TRAIN_DIR_DAY
        tdd
        WHERE
        std1.TRAIN_DIR_DAY_ID=std2.TRAIN_DIR_DAY_ID