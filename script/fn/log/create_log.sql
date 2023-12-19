
/**
 * Name:Crear registro del log
 * Creator: Hesllar Linzmayer
 * Description: Crear registro del log
 * Create: 14-12-2023
 * Last Update: **-**-****
 * select * from create_log(1, 'usuario creado correctamente', 'POST', '/controller/asd', 201, false, null, null, 'hesllar@gmail.com', '[]', 'info');
 */


CREATE OR REPLACE FUNCTION create_log(
	p_code integer, 
	p_message character varying, 
	p_method character varying, 
	p_path character varying, 
	p_status_code integer, 
	p_is_error boolean, 
	p_request text, 
	p_stack text, 
	p_username character varying,  
	p_headers text, 
	p_level character varying
)
 RETURNS TABLE(
 	id 			int,
 	code 		int,
 	message		varchar,
 	"method" 	varchar,
 	"path" 		varchar,
 	status_code int,
 	is_error 	bool,
 	request 	text,
 	stack 		text,
 	username	varchar,
 	headers 	text,
 	"level" 	varchar,
 	created_at 	date
 
 
 )
 LANGUAGE plpgsql
AS $function$
declare 
v_new_log tecnogamer_log%ROWTYPE;
begin
	
	INSERT INTO tecnogamer_log(code, message,  "method", "path", status_code, is_error, request, stack, username, headers, "level")
	VALUES(p_code, p_message, p_method, p_path, p_status_code, p_is_error, p_request, p_stack, p_username, p_headers, p_level)returning * into v_new_log;

	RETURN QUERY
		select 	v_new_log.id, v_new_log.code, v_new_log.message, v_new_log."method", v_new_log."path", v_new_log.status_code,
				v_new_log.is_error, v_new_log.request, v_new_log.stack, v_new_log.username, v_new_log.headers, v_new_log."level", v_new_log.created_at::date;
	exception 
		when others then 
			RAISE;
END;
$function$
;