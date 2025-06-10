import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

export function configurePassport(passport){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        
        try {
            const user = await Usuario.findOne({ where: {email: email} })
            if(!user){
                return done(null, false, { message: 'Usuario no encontrado' } );
            }
            const passMatch = await bcrypt.compare(password, user.password);
            if (!passMatch) {
                return done(null, false, { message: 'Contraseña incorrecta' } );
            }
            return done(null,user);


        }catch (error) {
            error('Error de autenticación:', error);
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Usuario.findByPk(id);
            if (!user) {
                done(null, false); 
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    });
}