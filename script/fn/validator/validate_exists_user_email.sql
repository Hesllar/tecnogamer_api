/**
 * Name:Validar si el usuario existe en la base de datos
 * Creator: Hesllar Linzmayer
 * Description:Validar si el usuario existe en la base de datos
 * Create: 15-12-2023
 * Last Update: **-**-****
 * select * from validate_exists_user_email('hesllar2@gmail.com');
 */


CREATE OR REPLACE FUNCTION validate_exists_user_email(p_email varchar)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	if(exists(select * from "user" u where u.email = p_email))then 
		return true;
	end if;

	return false;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;