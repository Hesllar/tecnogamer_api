/**
 * Name:Validar si el rol del usuario existe en la base de datos
 * Creator: Hesllar Linzmayer
 * Description:Validar si el rol del usuario existe en la base de datos
 * Create: 22-12-2023
 * Last Update: **-**-****
 * select * from validate_exists_rol_user(1);
 */



CREATE OR REPLACE FUNCTION validate_exists_rol_user(p_rol_user int)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$

BEGIN
	
	if(exists(select * from role_user ru where ru.id = p_rol_user))then 
		return true;
	end if;

	return false;

	EXCEPTION
		WHEN OTHERS THEN
			RAISE;
END;
$function$
;