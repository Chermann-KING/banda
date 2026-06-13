import { z } from 'zod';
import { fieldSpecs } from '@banda/fields';
import {
  AmountField,
  BandaButton,
  BandaCard,
  BirthDateField,
  CityField,
  EmailField,
  FirstNameField,
  Form,
  LastNameField,
  PasswordField,
  PhoneField,
  useForm,
  useToast,
} from '@/ui';

/**
 * Le schéma du formulaire est COMPOSÉ depuis les specs partagées :
 * aucune règle n'est redéclarée ici (DRY).
 * Le téléphone est validé champ par champ (le masque dépend du pays
 * sélectionné) — au niveau formulaire, on exige simplement une valeur.
 */
const registrationSchema = z.object({
  firstName: fieldSpecs.firstName.schema,
  lastName: fieldSpecs.lastName.schema,
  email: fieldSpecs.email.schema,
  phone: z.string().min(1, 'Le numéro de téléphone est requis.'),
  birthDate: fieldSpecs.birthDate.schema,
  city: fieldSpecs.city.schema,
  amount: fieldSpecs.amount.schema,
  password: fieldSpecs.password.schema,
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  city: '',
  amount: '',
  password: '',
};

export function SmartFieldsSection() {
  const { show } = useToast();

  const form = useForm({
    schema: registrationSchema,
    initialValues,
    onSubmit: (values) => {
      show({ message: `Inscription validée pour ${values.firstName} ${values.lastName}.`, variant: 'success' });
      form.reset();
    },
  });

  return (
    <section id="smart-fields" className="flex flex-col gap-3">
      <h2 className="m-0 font-sans text-2xl font-bold leading-tight tracking-tight text-banda-text">
        Smart fields
      </h2>
      <p className="m-0 font-sans leading-normal text-banda-text-muted">
        Champs auto-porteurs : sanitisation et formatage en temps réel pendant la frappe,
        validation <strong>Zod</strong> au blur et à la soumission. L'intelligence vient
        de <code>@banda/fields</code> — partagée entre tous les starters.
      </p>
      <BandaCard>
        <Form form={form} aria-label="Formulaire d'inscription">
          <BandaCard.Body className="grid gap-4 md:grid-cols-2">
            <FirstNameField name="firstName" label="Prénom" required />
            <LastNameField name="lastName" label="Nom" required />
            <div className="md:col-span-2">
              <EmailField name="email" label="Email" required />
            </div>
            <div className="md:col-span-2">
              <PhoneField name="phone" label="Téléphone" required defaultCountry="GA" />
            </div>
            <BirthDateField name="birthDate" label="Date de naissance" required />
            <CityField name="city" label="Ville" required />
            <AmountField name="amount" label="Revenu mensuel (FCFA)" required />
            <PasswordField name="password" label="Mot de passe" required />
          </BandaCard.Body>
          <BandaCard.Footer className="justify-end">
            <BandaButton variant="ghost" type="reset" onClick={() => form.reset()}>
              Réinitialiser
            </BandaButton>
            <BandaButton type="submit" disabled={form.submitting}>
              {form.submitting ? 'Envoi…' : "S'inscrire"}
            </BandaButton>
          </BandaCard.Footer>
        </Form>
      </BandaCard>
    </section>
  );
}
