/**
 * Name:Crear un usuario
 * Creator: Hesllar Linzmayer
 * Description: Crea un nuevo usuario en la base de datos
 * Create: 13-12-2023
 * Last Update: 07-01-2024
 * select * from create_user('hesllar2@gmail.com', 'hesllar', '123', '', 1);
 */


CREATE OR REPLACE FUNCTION create_user(
	p_email 		varchar,
	p_name 			varchar,
	p_password 		varchar,
	p_description 	text,
	p_role_user_id 	int
)
 RETURNS TABLE(
 	id 				int,
 	email 			varchar,
 	"name"			varchar,
 	description 	text,
 	role_user_id 	int,
 	created_at 		date
 )
 LANGUAGE plpgsql
AS $function$
declare
v_new_user "user"%ROWTYPE;
BEGIN
	
	if((select validate_exists_user_email(lower(p_email))) is true)then
		raise exception 'El correo enviado ya esta registrado';
	elsif((select validate_exists_rol_user(p_role_user_id)) is false)then
		raise exception 'El rol enviado no esta registrado';
	end if;
	
	insert into "user"(email, "name", "password", description, role_user_id)
	values(p_email, p_name, p_password, p_description, p_role_user_id)returning * into v_new_user;

	RETURN QUERY
		SELECT v_new_user.id, v_new_user.email, v_new_user."name", v_new_user.description, v_new_user.role_user_id, v_new_user.created_at::date ;
	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;