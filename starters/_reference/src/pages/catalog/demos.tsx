import { useState } from 'react';
import { SmartFieldsSection } from '@/pages/demo/SmartFieldsSection';
import {
  Apple,
  AlignJustify,
  Archive,
  Armchair,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Bookmark,
  CalendarDays,
  ChartPie,
  Cherry,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleDot,
  Cloud,
  Code,
  Database,
  Download,
  Ellipsis,
  Equal,
  Eye,
  FileText,
  Footprints,
  Gift,
  Heading1,
  Heading2,
  Grape,
  Heart,
  Home,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Mouse,
  Palette,
  Pencil,
  Plus,
  Repeat2,
  Gamepad2,
  Music,
  Send,
  Settings,
  ShoppingCart,
  Smartphone,
  Star,
  TextSearch,
  Trash2,
  User,
  UserPlus,
} from 'lucide-react';
import {
  BandaBadge,
  ClosableBadge,
  CountBadge,
  DotBadge,
  GradientBadge,
  GradientOutlineBadge,
  LinkBadge,
  SelectableBadge,
  StatusBadge,
  BounceButton,
  CounterButton,
  DashedButton,
  GlassButton,
  GrowButton,
  HeartbeatButton,
  IconButton,
  MagneticButton,
  NotificationButton,
  PillButton,
  PulseButton,
  RingHoverButton,
  RippleButton,
  ShimmerButton,
  ShineButton,
  SocialButton,
  SwipeButton,
  TapButton,
  BandaButton,
  BandaCheckbox,
  CheckboxCard,
  CheckboxGroup,
  ChipCheckbox,
  IconCheckbox,
  RowCheckbox,
  BandaInput,
  AddonInput,
  ButtonInput,
  CharacterCountInput,
  ClearInput,
  FileInput,
  FloatingLabelInput,
  InlineIconButtonInput,
  NumberInput,
  PasswordInput,
  PasswordStrengthInput,
  PillInput,
  SearchInput,
  BandaRadio,
  ChipRadio,
  RadioCard,
  RadioGroup,
  RowRadio,
  BandaSelect,
  InsetLabelSelect,
  ListboxSelect,
  MultiSelect,
  OverlappingLabelSelect,
  BandaForm,
  FormActions,
  FormHeader,
  BandaTable,
  DataTable,
  TablePagination,
  BandaStepper,
  useStepper,
  BandaDropdownMenu,
  DetailedMenuItem,
  MenuProfileHeader,
  SwitchMenuItem,
  BandaTabs,
  BandaDialog,
  AlertDialog,
  BandaCard,
  GlowCard,
  TiltCard,
  BandaLabel,
  BandaSwitch,
  DualLabelSwitch,
  IconSwitch,
  RowSwitch,
  SwitchCard,
  TextSwitch,
  ThemeSwitch,
  ThumbIconSwitch,
  BadgeLabel,
  EditableLabel,
  InfoLabel,
  StatusDotLabel,
  BandaTextarea,
  AutoGrowTextarea,
  ButtonTextarea,
  FloatingLabelTextarea,
  InsetLabelTextarea,
  OverlappingLabelTextarea,
  useToast,
} from '@/ui';

/** Bloc d'exemple nommé — chaque page composant empile ces blocs (façon shadcn). */
function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="m-0 font-sans font-bold leading-tight tracking-tight text-banda-text text-lg">
        {title}
      </h3>
      <div className="rounded-lg border border-banda-border bg-banda-surface p-6">{children}</div>
    </div>
  );
}

/** Cellule de grille façon shadcn/studio : le modèle + son nom dessous. */
function ModelCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-md border border-banda-border p-6">
      {children}
      <span className="font-sans text-xs text-banda-text-muted">{label}</span>
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: 'progress', label: (
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-banda-info" aria-hidden="true" /> En cours
      </span>
    ) },
  { value: 'done', label: (
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-banda-success" aria-hidden="true" /> Terminé
      </span>
    ) },
  { value: 'blocked', label: (
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-banda-danger" aria-hidden="true" /> Bloqué
      </span>
    ) },
];

const GROUPED_LANGUAGES = [
  { value: 'yipunu', label: 'Yipunu', group: 'Langues bantoues' },
  { value: 'fang', label: 'Fang', group: 'Langues bantoues' },
  { value: 'swahili', label: 'Swahili', group: 'Langues bantoues' },
  { value: 'fr', label: 'Français', group: 'Autres langues' },
  { value: 'en', label: 'English', group: 'Autres langues', disabled: true },
  { value: 'ar', label: 'العربية', group: 'Autres langues' },
];

const ICON_OPTIONS = [
  { value: 'rock', label: (
      <span className="flex items-center gap-2">
        <Music size={14} aria-hidden="true" /> Rock
      </span>
    ) },
  { value: 'jeux', label: (
      <span className="flex items-center gap-2">
        <Gamepad2 size={14} aria-hidden="true" /> Jeux vidéo
      </span>
    ) },
];

const AVATAR_OPTIONS = [
  { value: 'pm', label: (
      <span className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-banda-primary-muted font-sans text-xs font-semibold text-banda-primary" aria-hidden="true">PM</span>
        Pulchérie Moussavou
      </span>
    ) },
  { value: 'ko', label: (
      <span className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-banda-secondary-muted font-sans text-xs font-semibold text-banda-secondary" aria-hidden="true">KO</span>
        Karl Ondo
      </span>
    ) },
];

const SEPARATOR_OPTIONS = [
  { value: 'profil', label: 'Mon profil' },
  { value: 'parametres', label: 'Paramètres' },
  { value: 'deconnexion', label: 'Déconnexion', separator: true },
];

const COUNTRY_OPTIONS = [
  { value: 'GA', label: '🇬🇦 Gabon' },
  { value: 'CM', label: '🇨🇲 Cameroun' },
  { value: 'SN', label: '🇸🇳 Sénégal' },
];

const LANGUAGES = [
  { value: 'yipunu', label: 'Yipunu' },
  { value: 'fang', label: 'Fang' },
  { value: 'fr', label: 'Français' },
];

export function ButtonDemo() {
  return (
    <>
      <Example title="Variantes de base">
        <div className="flex flex-wrap items-center gap-3">
          <BandaButton variant="primary">Primary</BandaButton>
          <BandaButton variant="secondary">Secondary</BandaButton>
          <BandaButton variant="outline">Outline</BandaButton>
          <BandaButton variant="ghost">Ghost</BandaButton>
          <BandaButton variant="danger">Danger</BandaButton>
          <BandaButton variant="link">Link</BandaButton>
        </div>
      </Example>
      <Example title="Tailles & états">
        <div className="flex flex-wrap items-center gap-3">
          <BandaButton size="sm">Small</BandaButton>
          <BandaButton size="md">Medium</BandaButton>
          <BandaButton size="lg">Large</BandaButton>
          <BandaButton loading>Chargement</BandaButton>
          <BandaButton disabled>Désactivé</BandaButton>
        </div>
      </Example>
      <Example title="Modèles — compositions">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Avec icônes">
            <BandaButton>
              Get in touch <ArrowRight size={16} aria-hidden="true" />
            </BandaButton>
          </ModelCell>
          <ModelCell label="IconButton">
            <div className="flex gap-2">
              <IconButton icon={Bookmark} aria-label="Enregistrer" variant="outline" />
              <IconButton icon={Plus} aria-label="Ajouter" />
              <IconButton icon={Menu} aria-label="Menu" variant="ghost" />
            </div>
          </ModelCell>
          <ModelCell label="Danger + icône">
            <BandaButton variant="danger">
              <Trash2 size={16} aria-hidden="true" /> Supprimer
            </BandaButton>
          </ModelCell>
          <ModelCell label="CounterButton">
            <CounterButton count="99+">
              <Mail size={16} aria-hidden="true" /> Messages
            </CounterButton>
          </ModelCell>
          <ModelCell label="NotificationButton">
            <NotificationButton />
          </ModelCell>
          <ModelCell label="PillButton">
            <PillButton variant="secondary">Publier</PillButton>
          </ModelCell>
          <ModelCell label="DashedButton">
            <DashedButton>
              <Download size={16} aria-hidden="true" /> Télécharger
            </DashedButton>
          </ModelCell>
          <ModelCell label="SocialButton">
            <div className="flex w-full max-w-xs flex-col gap-2">
              <SocialButton provider="google" />
              <SocialButton provider="github" />
            </div>
          </ModelCell>
        </div>
      </Example>
      <Example title="Modèles — animés">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="RippleButton (cliquez)">
            <RippleButton>Ripple Effect</RippleButton>
          </ModelCell>
          <ModelCell label="ShineButton (survolez)">
            <ShineButton>Shine Hover</ShineButton>
          </ModelCell>
          <ModelCell label="ShimmerButton">
            <ShimmerButton>Shimmer Button</ShimmerButton>
          </ModelCell>
          <ModelCell label="TapButton (cliquez)">
            <TapButton variant="secondary">Tap Animation</TapButton>
          </ModelCell>
          <ModelCell label="BounceButton (survolez)">
            <BounceButton variant="outline">Bounce Button</BounceButton>
          </ModelCell>
          <ModelCell label="HeartbeatButton">
            <HeartbeatButton variant="danger">Heartbeat Effect</HeartbeatButton>
          </ModelCell>
          <ModelCell label="PulseButton">
            <PulseButton>Pulse Button</PulseButton>
          </ModelCell>
          <ModelCell label="RingHoverButton (survolez)">
            <RingHoverButton>Ring Hover</RingHoverButton>
          </ModelCell>
          <ModelCell label="GrowButton (survolez)">
            <GrowButton variant="secondary">Grow Button</GrowButton>
          </ModelCell>
          <ModelCell label="SwipeButton (survolez)">
            <SwipeButton>Swipe Button</SwipeButton>
          </ModelCell>
          <ModelCell label="MagneticButton (survolez)">
            <MagneticButton variant="outline">Magnetic Button</MagneticButton>
          </ModelCell>
          <ModelCell label="GlassButton">
            <GlassButton>Glass Button</GlassButton>
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

export function InputDemo() {
  return (
    <>
      <Example title="États">
        <div className="grid gap-4 md:grid-cols-2">
          <BandaInput label="Default" placeholder="Votre nom" hint="Champ standard" />
          <BandaInput label="Erreur" placeholder="Votre nom" error="Ce champ est requis." />
          <BandaInput label="Désactivé" disabled defaultValue="Lecture seule" />
          <BandaInput
            label="Validé (au blur)"
            placeholder="Min. 3 caractères"
            validate={(value) => (value.length < 3 ? 'Au moins 3 caractères.' : null)}
            sanitize
            hint="Tapez puis quittez le champ"
          />
        </div>
      </Example>
      <Example title="Tailles">
        <div className="grid gap-4 md:grid-cols-3">
          <BandaInput label="Small" size="sm" placeholder="size=sm" />
          <BandaInput label="Medium" size="md" placeholder="size=md" />
          <BandaInput label="Large" size="lg" placeholder="size=lg" />
        </div>
      </Example>
      <Example title="Variantes">
        <div className="grid gap-4 md:grid-cols-3">
          <BandaInput label="Default" variant="default" placeholder="variant=default" />
          <BandaInput label="Filled" variant="filled" placeholder="variant=filled" />
          <BandaInput label="Ghost" variant="ghost" placeholder="variant=ghost" />
        </div>
      </Example>
      <Example title="Modèles — icônes & add-ons">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="startIcon / endIcon">
            <div className="flex w-full flex-col gap-2">
              <BandaInput hideLabel label="Utilisateur" startIcon={User} placeholder="Utilisateur" />
              <BandaInput hideLabel label="Email" endIcon={Mail} placeholder="Email" />
            </div>
          </ModelCell>
          <ModelCell label="AddonInput (inline)">
            <AddonInput label="Site" startAddon="https://" endAddon=".com" placeholder="banda" />
          </ModelCell>
          <ModelCell label="AddonInput (boxed)">
            <AddonInput label="Site" boxed startAddon="https://" placeholder="banda.dev" />
          </ModelCell>
          <ModelCell label="ButtonInput">
            <ButtonInput label="Newsletter" buttonLabel="S'abonner" placeholder="Email" />
          </ModelCell>
          <ModelCell label="InlineIconButtonInput">
            <div className="flex w-full flex-col gap-2">
              <InlineIconButtonInput label="Message" icon={Send} actionLabel="Envoyer" placeholder="Votre message" />
              <InlineIconButtonInput label="Export" icon={Download} actionLabel="Télécharger" placeholder="Rapport" />
            </div>
          </ModelCell>
          <ModelCell label="PillInput">
            <PillInput label="Email" placeholder="Arrondi complet" />
          </ModelCell>
        </div>
      </Example>
      <Example title="Modèles — saisies spécialisées">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="PasswordInput">
            <PasswordInput placeholder="Mot de passe" />
          </ModelCell>
          <ModelCell label="PasswordStrengthInput">
            <PasswordStrengthInput placeholder="Tapez pour évaluer" />
          </ModelCell>
          <ModelCell label="SearchInput (kbd, sanitizée)">
            <SearchInput kbd="Ctrl K" />
          </ModelCell>
          <ModelCell label="SearchInput (loader)">
            <SearchInput loading placeholder="Recherche en cours…" />
          </ModelCell>
          <ModelCell label="NumberInput (+/-)">
            <NumberInput label="Quantité" defaultValue={1024} min={0} />
          </ModelCell>
          <ModelCell label="NumberInput (chevrons)">
            <NumberInput label="Quantité" stacked defaultValue={1024} min={0} />
          </ModelCell>
          <ModelCell label="ClearInput (tapez)">
            <ClearInput label="Texte" placeholder="Cliquez pour effacer" />
          </ModelCell>
          <ModelCell label="CharacterCountInput">
            <CharacterCountInput label="Pseudo" maxLength={50} placeholder="0/50" />
          </ModelCell>
          <ModelCell label="FileInput">
            <FileInput hint="PDF, 5 Mo max" />
          </ModelCell>
          <ModelCell label="FloatingLabelInput">
            <FloatingLabelInput label="Adresse email" />
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

export function SelectDemo() {
  const [lang, setLang] = useState('yipunu');
  return (
    <>
      <Example title="États">
        <div className="grid gap-4 md:grid-cols-2">
          <BandaSelect
            label="Langue"
            options={LANGUAGES}
            value={lang}
            onChange={setLang}
            hint="Dropdown 100 % stylée tokens"
            required
          />
          <BandaSelect label="Erreur" options={LANGUAGES} placeholder="Choisir…" error="Sélection requise." />
          <BandaSelect label="Désactivé" options={LANGUAGES} placeholder="Choisir…" disabled />
          <BandaInput label="Aligné sur BandaInput" placeholder="Même hauteur, même border" />
        </div>
      </Example>
      <Example title="Tailles">
        <div className="grid gap-4 md:grid-cols-3">
          <BandaSelect label="Small" size="sm" options={LANGUAGES} defaultValue="yipunu" />
          <BandaSelect label="Medium" size="md" options={LANGUAGES} defaultValue="fang" />
          <BandaSelect label="Large" size="lg" options={LANGUAGES} defaultValue="fr" />
        </div>
      </Example>
      <Example title="Modèles — options riches & groupes">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Groupes + option désactivée">
            <BandaSelect label="Langue" hideLabel options={GROUPED_LANGUAGES} placeholder="Choisir une langue…" />
          </ModelCell>
          <ModelCell label="Statuts (pastilles)">
            <BandaSelect label="Statut" hideLabel options={STATUS_OPTIONS} defaultValue="progress" />
          </ModelCell>
          <ModelCell label="Drapeaux">
            <BandaSelect label="Pays" hideLabel options={COUNTRY_OPTIONS} defaultValue="GA" />
          </ModelCell>
          <ModelCell label="Texte d'amorce (renderValue)">
            <BandaSelect
              label="Langue préférée"
              hideLabel
              options={LANGUAGES}
              defaultValue="yipunu"
              renderValue={(option) => (
                <span>
                  <span className="text-banda-text-muted">Langue : </span>
                  {option.label}
                </span>
              )}
            />
          </ModelCell>
          <ModelCell label="Animation slide-up">
            <BandaSelect label="Animée" hideLabel options={LANGUAGES} placeholder="Ouvrir…" animation="slide" />
          </ModelCell>
          <ModelCell label="Animation zoom-in">
            <BandaSelect label="Animée" hideLabel options={LANGUAGES} placeholder="Ouvrir…" animation="zoom" />
          </ModelCell>
          <ModelCell label="Icône dans le déclencheur">
            <BandaSelect label="Genre" hideLabel startIcon={Gamepad2} options={ICON_OPTIONS} placeholder="Choisir un genre…" />
          </ModelCell>
          <ModelCell label="Options avec icône">
            <BandaSelect label="Préférence" hideLabel options={ICON_OPTIONS} defaultValue="rock" />
          </ModelCell>
          <ModelCell label="Options avec avatar">
            <BandaSelect label="Assigné à" hideLabel options={AVATAR_OPTIONS} defaultValue="pm" />
          </ModelCell>
          <ModelCell label="Séparateur d'options">
            <BandaSelect label="Compte" hideLabel options={SEPARATOR_OPTIONS} placeholder="Menu compte…" />
          </ModelCell>
          <ModelCell label="Contour & ring colorés">
            <BandaSelect
              label="Catégorie"
              hideLabel
              options={LANGUAGES}
              defaultValue="fr"
              triggerClassName="border-banda-info focus-visible:border-banda-info focus-visible:ring-banda-info"
            />
          </ModelCell>
          <ModelCell label="Fond coloré">
            <BandaSelect
              label="Langue"
              hideLabel
              options={LANGUAGES}
              defaultValue="yipunu"
              triggerClassName="border-banda-info bg-banda-info-muted text-banda-info"
            />
          </ModelCell>
          <ModelCell label="Label chevauchant">
            <OverlappingLabelSelect label="Métier" options={LANGUAGES} placeholder="Développeur" className="w-full" />
          </ModelCell>
          <ModelCell label="Label inset">
            <InsetLabelSelect label="Moyen de paiement" options={LANGUAGES} placeholder="Choisir…" className="w-full" />
          </ModelCell>
        </div>
      </Example>
      <Example title="Modèles — MultiSelect & Listbox">
        <div className="grid gap-6 md:grid-cols-2">
          <ModelCell label="MultiSelect (chips + tout effacer)">
            <MultiSelect
              label="Catégories"
              hideLabel
              options={GROUPED_LANGUAGES.filter((option) => !option.disabled)}
              defaultValues={['yipunu', 'fang']}
              placeholder="Sélectionner des langues…"
            />
          </ModelCell>
          <ModelCell label="ListboxSelect (toujours ouvert, groupes)">
            <ListboxSelect label="Langue" hideLabel options={GROUPED_LANGUAGES} defaultValue="yipunu" className="w-full" />
          </ModelCell>
          <ModelCell label="Listbox multiple (régimes)">
            <ListboxSelect
              label="Régimes"
              hideLabel
              multiple
              options={[
                { value: 'vegetarien', label: 'Végétarien' },
                { value: 'vegan', label: 'Vegan' },
                { value: 'sans-gluten', label: 'Sans gluten' },
                { value: 'halal', label: 'Halal' },
              ]}
              defaultValues={['vegetarien', 'halal']}
              className="w-full"
            />
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

export function TextareaDemo() {
  return (
    <>
      <Example title="États">
        <div className="grid gap-4 md:grid-cols-2">
          <BandaTextarea
            label="Message"
            placeholder="Les caractères dangereux sont retirés à la frappe…"
            hint="Sanitize actif par défaut"
            maxLength={200}
            showCounter
          />
          <BandaTextarea label="Erreur" error="Le message est requis." placeholder="…" />
          <BandaTextarea label="Requis" required placeholder="Votre avis…" />
          <BandaTextarea
            label="Validé (au blur)"
            placeholder="Min. 10 caractères"
            validate={(value) => (value.length < 10 ? 'Au moins 10 caractères.' : null)}
            hint="Tapez puis quittez le champ"
          />
          <BandaTextarea label="Lecture seule" readOnly defaultValue="Contenu non modifiable." />
          <BandaTextarea label="Désactivé" disabled defaultValue="Champ désactivé." />
        </div>
      </Example>
      <Example title="Tailles">
        <div className="grid gap-4 md:grid-cols-3">
          <BandaTextarea label="Small" size="sm" placeholder="size=sm" />
          <BandaTextarea label="Medium" size="md" placeholder="size=md" />
          <BandaTextarea label="Large" size="lg" placeholder="size=lg" />
        </div>
      </Example>
      <Example title="Variantes">
        <div className="grid gap-4 md:grid-cols-3">
          <BandaTextarea label="Default" variant="default" placeholder="variant=default" />
          <BandaTextarea label="Filled" variant="filled" placeholder="variant=filled" />
          <BandaTextarea label="Ghost" variant="ghost" placeholder="variant=ghost" />
        </div>
      </Example>
      <Example title="Modèles — labels & hints">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Hint à droite">
            <BandaTextarea
              label="Avis"
              placeholder="Votre avis…"
              hint="Votre avis nous est utile."
              hintAlign="end"
              className="w-full"
            />
          </ModelCell>
          <ModelCell label="cornerHint">
            <BandaTextarea
              label="Commentaire"
              cornerHint="Champ optionnel"
              placeholder="Votre commentaire…"
              className="w-full"
            />
          </ModelCell>
          <ModelCell label="Label chevauchant">
            <OverlappingLabelTextarea label="Avis" placeholder="" className="w-full" />
          </ModelCell>
          <ModelCell label="Label flottant">
            <FloatingLabelTextarea label="Votre message" className="w-full" />
          </ModelCell>
          <ModelCell label="Label inset">
            <InsetLabelTextarea label="Avis" className="w-full" />
          </ModelCell>
        </div>
      </Example>
      <Example title="Modèles — compositions">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="startIcon / endIcon">
            <div className="flex w-full flex-col gap-2">
              <BandaTextarea hideLabel label="Adresse" startIcon={Home} placeholder="Adresse" size="sm" />
              <BandaTextarea hideLabel label="Adresse" endIcon={Home} placeholder="Adresse" size="sm" />
            </div>
          </ModelCell>
          <ModelCell label="Contour & ring colorés">
            <BandaTextarea
              hideLabel
              label="Avis"
              placeholder="Votre avis…"
              textareaClassName="border-banda-info focus-visible:border-banda-info focus-visible:ring-banda-info"
              className="w-full"
            />
          </ModelCell>
          <ModelCell label="ButtonTextarea (buttonAlign=end)">
            <ButtonTextarea
              label="Avis"
              buttonLabel="Envoyer l'avis"
              buttonAlign="end"
              placeholder="Votre avis…"
              className="w-full"
            />
          </ModelCell>
          <ModelCell label="AutoGrowTextarea (tapez)">
            <AutoGrowTextarea hideLabel label="Message" placeholder="Le champ grandit avec le texte…" className="w-full" />
          </ModelCell>
          <ModelCell label="resize=none">
            <BandaTextarea hideLabel label="Avis" resize="none" placeholder="Pas de poignée" className="w-full" />
          </ModelCell>
          <ModelCell label="Compteur (counterAlign=start)">
            <BandaTextarea
              hideLabel
              label="Bio"
              maxLength={80}
              showCounter
              counterAlign="start"
              placeholder="80 caractères max…"
              className="w-full"
            />
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

export function FormDemo() {
  const { show } = useToast();
  const submitted = (message: string) => () => show({ message, variant: 'success' });

  return (
    <>
      <Example title="Compositions simples (onSubmitValues + FormData)">
        <div className="grid gap-6 md:grid-cols-2">
          <ModelCell label="RadioGroup + actions">
            <BandaForm
              className="w-full"
              onSubmitValues={submitted('Préférences mises à jour.')}
            >
              <RadioGroup
                legend="Gérer le partage de données"
                name="partage"
                options={[
                  { value: 'perso', label: 'Partager pour une expérience personnalisée' },
                  { value: 'aucun', label: 'Ne rien partager' },
                  { value: 'custom', label: 'Personnaliser le partage' },
                ]}
              />
              <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                Sélectionnez une option pour continuer.
              </p>
              <FormActions>
                <BandaButton type="submit" size="sm">
                  Mettre à jour
                </BandaButton>
              </FormActions>
            </BandaForm>
          </ModelCell>
          <ModelCell label="Consentement + bouton">
            <BandaForm className="w-full" onSubmitValues={submitted('Bienvenue à bord !')}>
              <BandaCheckbox
                name="consentement"
                label="Rejoindre la communauté"
                description="En cliquant sur « Rejoindre », vous acceptez les règles de la communauté et la politique de confidentialité."
                required
              />
              <FormActions>
                <BandaButton type="submit" size="sm">
                  Rejoindre
                </BandaButton>
              </FormActions>
            </BandaForm>
          </ModelCell>
          <ModelCell label="Switch + description">
            <BandaForm className="w-full" onSubmitValues={submitted('Suivi activé.')}>
              <BandaSwitch
                name="suivi"
                label="Activer le suivi quotidien"
                description="Suivez vos pas quotidiens pour atteindre vos objectifs."
              />
              <FormActions>
                <BandaButton type="submit" size="sm">
                  Valider
                </BandaButton>
              </FormActions>
            </BandaForm>
          </ModelCell>
          <ModelCell label="Input + soumission">
            <BandaForm className="w-full" onSubmitValues={submitted('Email de réinitialisation envoyé.')}>
              <BandaInput
                name="email"
                type="email"
                label="Réinitialiser votre mot de passe"
                placeholder="Adresse email"
                required
              />
              <FormActions>
                <BandaButton type="submit" size="sm">
                  Envoyer
                </BandaButton>
              </FormActions>
            </BandaForm>
          </ModelCell>
          <ModelCell label="Select + hint">
            <BandaForm className="w-full" onSubmitValues={submitted('Moyen de paiement enregistré.')}>
              <BandaSelect
                name="paiement"
                label="Moyen de paiement"
                placeholder="Choisir un moyen de paiement…"
                hint="Sélectionnez votre moyen de paiement préféré."
                options={[
                  { value: 'mobile', label: 'Mobile Money' },
                  { value: 'carte', label: 'Carte bancaire' },
                  { value: 'virement', label: 'Virement' },
                ]}
              />
              <FormActions>
                <BandaButton type="submit" size="sm">
                  Continuer
                </BandaButton>
              </FormActions>
            </BandaForm>
          </ModelCell>
          <ModelCell label="Date native + hint">
            <BandaForm className="w-full" onSubmitValues={submitted('Date enregistrée.')}>
              <BandaInput
                name="naissance"
                type="date"
                label="Tendances pour vous"
                hint="Votre date de naissance révèle des styles adaptés à votre parcours."
              />
              <FormActions>
                <BandaButton type="submit" size="sm">
                  Valider
                </BandaButton>
              </FormActions>
            </BandaForm>
          </ModelCell>
        </div>
      </Example>
      <Example title="Formulaire carte (card + FormHeader)">
        <div className="mx-auto max-w-md">
          <BandaForm card onSubmitValues={submitted('Problème signalé — merci !')}>
            <FormHeader
              title="Signaler un problème"
              description="Décrivez le problème rencontré ; notre équipe vous aidera."
            />
            <BandaInput name="email" type="email" label="Email" placeholder="Adresse email" required />
            <BandaSelect
              name="probleme"
              label="Problème"
              placeholder="Problème rencontré…"
              options={[
                { value: 'livraison', label: 'Livraison' },
                { value: 'produit', label: 'Produit défectueux' },
                { value: 'facturation', label: 'Facturation' },
              ]}
            />
            <RadioGroup
              legend="Comment pouvons-nous vous aider ?"
              name="aide"
              options={[
                { value: 'remplacement', label: 'Remplacement du produit' },
                { value: 'remboursement', label: 'Remboursement' },
                { value: 'assistance', label: 'Conseils ou assistance' },
              ]}
            />
            <BandaTextarea
              name="description"
              label="Décrivez votre problème"
              placeholder="Donnez le maximum de détails…"
              maxLength={500}
              showCounter
            />
            <FormActions align="end">
              <BandaButton type="reset" variant="outline" size="sm">
                Réinitialiser
              </BandaButton>
              <BandaButton type="submit" size="sm">
                Envoyer
              </BandaButton>
            </FormActions>
          </BandaForm>
        </div>
      </Example>
      <Example title="Moteur Zod + smart fields (FormApi)">
        <SmartFieldsSection />
      </Example>
    </>
  );
}

export function CheckboxDemo() {
  return (
    <>
      <Example title="États">
        <div className="flex flex-col gap-3">
          <BandaCheckbox label="Conditions acceptées" description="Avec description" defaultChecked />
          <BandaCheckbox label="Newsletter" />
          <BandaCheckbox label="Indéterminée" indeterminate />
          <BandaCheckbox label="Désactivée" disabled />
          <BandaCheckbox label="Cochée désactivée" disabled defaultChecked />
          <BandaCheckbox label="En erreur" error="Cochez cette case." />
        </div>
      </Example>
      <Example title="Tailles">
        <div className="flex flex-wrap items-center gap-6">
          <BandaCheckbox label="Small" size="sm" defaultChecked />
          <BandaCheckbox label="Medium" size="md" defaultChecked />
          <BandaCheckbox label="Large" size="lg" defaultChecked />
        </div>
      </Example>
      <Example title="Couleurs & formes">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <BandaCheckbox label="Danger" color="danger" defaultChecked />
            <BandaCheckbox label="Info" color="info" defaultChecked />
            <BandaCheckbox label="Success" color="success" defaultChecked />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <BandaCheckbox label="Ronde danger" shape="circle" color="danger" defaultChecked />
            <BandaCheckbox label="Ronde info" shape="circle" color="info" defaultChecked />
            <BandaCheckbox label="Ronde success" shape="circle" color="success" defaultChecked />
          </div>
        </div>
      </Example>
      <Example title="Modèles — décorées">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Bordure pointillée (boxClassName)">
            <BandaCheckbox label="Conditions acceptées" boxClassName="border-dashed" />
          </ModelCell>
          <ModelCell label="strikeOnCheck (todo)">
            <BandaCheckbox label="Tâche de la todo list" strikeOnCheck defaultChecked />
          </ModelCell>
          <ModelCell label="ChipCheckbox (filtres)">
            <div className="flex flex-wrap gap-2">
              <ChipCheckbox label="Burger" defaultChecked />
              <ChipCheckbox label="Pizza" defaultChecked />
              <ChipCheckbox label="Boissons" />
            </div>
          </ModelCell>
          <ModelCell label="IconCheckbox (cliquez)">
            <div className="flex items-center gap-3">
              <IconCheckbox icon={Heart} label="Favori" color="danger" defaultChecked />
              <IconCheckbox icon={Star} label="Étoile" color="warning" defaultChecked />
              <IconCheckbox icon={CircleDot} label="Actif" color="success" defaultChecked />
            </div>
          </ModelCell>
          <ModelCell label="CheckboxCard">
            <div className="flex w-full flex-col gap-2">
              <CheckboxCard
                label="Démarrage automatique"
                description="Se lance avec votre système."
                defaultChecked
              />
              <CheckboxCard
                label="Mise à jour automatique"
                description="Télécharge et installe les nouvelles versions."
              />
            </div>
          </ModelCell>
          <ModelCell label="RowCheckbox (case à droite)">
            <div className="w-full divide-y divide-banda-border overflow-hidden rounded-md border border-banda-border">
              <RowCheckbox label="Développement web" icon={Code} defaultChecked />
              <RowCheckbox label="Analyse de données" icon={ChartPie} />
              <RowCheckbox label="Design graphique" icon={Palette} />
            </div>
          </ModelCell>
        </div>
      </Example>
      <Example title="Modèles — groupes">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Groupe horizontal (legend)">
            <CheckboxGroup
              legend="Technologies"
              orientation="horizontal"
              options={[
                { value: 'react', label: 'React' },
                { value: 'next', label: 'Next.js' },
                { value: 'remix', label: 'Remix' },
              ]}
              defaultValues={['react']}
            />
          </ModelCell>
          <ModelCell label="Groupe vertical + icônes">
            <CheckboxGroup
              legend="Fruits préférés"
              options={[
                { value: 'mangue', label: (
                    <span className="flex items-center gap-2">
                      <Apple size={14} aria-hidden="true" /> Mangue
                    </span>
                  ) },
                { value: 'cerise', label: (
                    <span className="flex items-center gap-2">
                      <Cherry size={14} aria-hidden="true" /> Cerise
                    </span>
                  ) },
                { value: 'raisin', label: (
                    <span className="flex items-center gap-2">
                      <Grape size={14} aria-hidden="true" /> Raisin
                    </span>
                  ) },
              ]}
            />
          </ModelCell>
          <ModelCell label="Tout sélectionner (indéterminée)">
            <CheckboxGroup
              legend="Permissions"
              hideLegend
              selectAllLabel="Toutes les permissions"
              options={[
                { value: 'lecture', label: 'Lecture' },
                { value: 'ecriture', label: 'Écriture' },
                { value: 'suppression', label: 'Suppression' },
              ]}
              defaultValues={['lecture', 'ecriture']}
            />
          </ModelCell>
          <ModelCell label="Composition formulaire">
            <form
              className="flex w-full flex-col items-start gap-3"
              onSubmit={(event) => event.preventDefault()}
            >
              <BandaCheckbox
                label="Conditions acceptées"
                description="En cochant cette case, vous acceptez les conditions d'utilisation."
                required
              />
              <div className="flex gap-2">
                <BandaButton type="reset" variant="outline" size="sm">
                  Réinitialiser
                </BandaButton>
                <BandaButton type="submit" size="sm">
                  Envoyer
                </BandaButton>
              </div>
            </form>
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

export function RadioDemo() {
  return (
    <>
      <Example title="États">
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Langue préférée">
          <BandaRadio name="catalog-radio" label="Yipunu" defaultChecked />
          <BandaRadio name="catalog-radio" label="Fang" description="Avec description" />
          <BandaRadio name="catalog-radio" label="Désactivé" disabled />
          <BandaRadio name="catalog-radio" label="En erreur" error="Choisissez une option." />
        </div>
      </Example>
      <Example title="Tailles">
        <div className="flex flex-wrap items-center gap-6">
          <BandaRadio name="catalog-radio-sizes" label="Small" size="sm" />
          <BandaRadio name="catalog-radio-sizes" label="Medium" size="md" defaultChecked />
          <BandaRadio name="catalog-radio-sizes" label="Large" size="lg" />
        </div>
      </Example>
      <Example title="Couleurs">
        <div className="flex flex-wrap items-center gap-6">
          <BandaRadio name="radio-danger" label="Danger" color="danger" defaultChecked />
          <BandaRadio name="radio-info" label="Info" color="info" defaultChecked />
          <BandaRadio name="radio-success" label="Success" color="success" defaultChecked />
        </div>
      </Example>
      <Example title="Modèles">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="ChipRadio (choix exclusif)">
            <div className="flex flex-wrap gap-2">
              <ChipRadio name="chip-radio" label="Mensuel" defaultChecked />
              <ChipRadio name="chip-radio" label="Annuel" />
              <ChipRadio name="chip-radio" label="À vie" />
            </div>
          </ModelCell>
          <ModelCell label="RadioCard (plans)">
            <div className="flex w-full flex-col gap-2">
              <RadioCard
                name="radio-plans"
                label="Starter"
                description="Pour découvrir — 0 FCFA/mois."
                defaultChecked
              />
              <RadioCard name="radio-plans" label="Pro" description="Pour les équipes — 15 000 FCFA/mois." />
            </div>
          </ModelCell>
          <ModelCell label="RowRadio (bouton à droite)">
            <div className="w-full divide-y divide-banda-border overflow-hidden rounded-md border border-banda-border">
              <RowRadio name="radio-rows" label="Développement web" icon={Code} defaultChecked />
              <RowRadio name="radio-rows" label="Analyse de données" icon={ChartPie} />
              <RowRadio name="radio-rows" label="Design graphique" icon={Palette} />
            </div>
          </ModelCell>
          <ModelCell label="RadioGroup vertical (legend)">
            <RadioGroup
              legend="Langue préférée"
              options={[
                { value: 'yipunu', label: 'Yipunu' },
                { value: 'fang', label: 'Fang', description: 'Avec description' },
                { value: 'fr', label: 'Français' },
              ]}
              defaultValue="yipunu"
            />
          </ModelCell>
          <ModelCell label="RadioGroup horizontal">
            <RadioGroup
              legend="Facturation"
              orientation="horizontal"
              options={[
                { value: 'mensuel', label: 'Mensuelle' },
                { value: 'annuel', label: 'Annuelle' },
              ]}
              defaultValue="annuel"
            />
          </ModelCell>
          <ModelCell label="Bordure pointillée (boxClassName)">
            <BandaRadio name="radio-dashed" label="Option en pointillés" boxClassName="border-dashed" />
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

export function SwitchDemo() {
  return (
    <>
      <Example title="États">
        <div className="flex flex-col gap-3">
          <BandaSwitch label="Notifications" defaultChecked />
          <BandaSwitch label="Mode avion" />
          <BandaSwitch label="Sauvegarde" description="Sauvegarde chaque fichier du projet." />
          <BandaSwitch label="Désactivé" disabled />
          <BandaSwitch label="Label avant (labelAlign=start)" labelAlign="start" />
        </div>
      </Example>
      <Example title="Tailles">
        <div className="flex flex-wrap items-center gap-6">
          <BandaSwitch label="Small" size="sm" defaultChecked />
          <BandaSwitch label="Medium" size="md" defaultChecked />
          <BandaSwitch label="Large" size="lg" defaultChecked />
        </div>
      </Example>
      <Example title="Couleurs & formes">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <BandaSwitch label="Danger" hideLabel color="danger" defaultChecked />
            <BandaSwitch label="Success" hideLabel color="success" defaultChecked />
            <BandaSwitch label="Info" hideLabel color="info" defaultChecked />
            <BandaSwitch label="Warning" hideLabel color="warning" defaultChecked />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <BandaSwitch label="Carré" shape="square" defaultChecked />
            <BandaSwitch
              label="Dégradé (trackClassName)"
              trackClassName="bg-gradient-to-r from-banda-warning to-banda-danger"
              defaultChecked
            />
          </div>
        </div>
      </Example>
      <Example title="Modèles — décorés">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="DualLabelSwitch">
            <DualLabelSwitch label="Réponse" offLabel="Oui" onLabel="Non" />
          </ModelCell>
          <ModelCell label="IconSwitch (rail)">
            <IconSwitch label="Activer" defaultChecked />
          </ModelCell>
          <ModelCell label="ThumbIconSwitch (curseur)">
            <ThumbIconSwitch label="Activer" />
          </ModelCell>
          <ModelCell label="TextSwitch">
            <TextSwitch label="Confirmer" defaultChecked />
          </ModelCell>
          <ModelCell label="ThemeSwitch">
            <ThemeSwitch label="Thème sombre" />
          </ModelCell>
        </div>
      </Example>
      <Example title="Modèles — surfaces">
        <div className="grid gap-6 md:grid-cols-2">
          <ModelCell label="SwitchCard">
            <div className="flex w-full flex-col gap-2">
              <SwitchCard
                icon={Database}
                label="Sauvegarde"
                description="Sauvegarde chaque fichier de votre projet."
                defaultChecked
              />
              <SwitchCard
                icon={Cloud}
                label="Sauvegarde cloud"
                description="Sauvegarde photos, vidéos et PDF."
              />
            </div>
          </ModelCell>
          <ModelCell label="RowSwitch (réglages)">
            <div className="w-full divide-y divide-banda-border overflow-hidden rounded-md border border-banda-border">
              <RowSwitch label="Développement web" icon={Code} defaultChecked />
              <RowSwitch label="Analyse de données" icon={ChartPie} />
              <RowSwitch label="Design graphique" icon={Palette} />
            </div>
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

const INVOICES = [
  { id: 'FAC001', status: 'Payée', method: 'Mobile Money', amount: '250 000 FCFA' },
  { id: 'FAC002', status: 'En attente', method: 'Carte bancaire', amount: '150 000 FCFA' },
  { id: 'FAC003', status: 'Impayée', method: 'Virement', amount: '350 000 FCFA' },
  { id: 'FAC004', status: 'Payée', method: 'Mobile Money', amount: '450 000 FCFA' },
  { id: 'FAC005', status: 'Payée', method: 'Carte bancaire', amount: '550 000 FCFA' },
  { id: 'FAC006', status: 'En attente', method: 'Virement', amount: '200 000 FCFA' },
  { id: 'FAC007', status: 'Impayée', method: 'Mobile Money', amount: '300 000 FCFA' },
];

const INVOICE_COLUMNS = [
  { key: 'id', header: 'Facture', render: (row: (typeof INVOICES)[number]) => row.id },
  { key: 'status', header: 'Statut', render: (row: (typeof INVOICES)[number]) => row.status },
  { key: 'method', header: 'Moyen', render: (row: (typeof INVOICES)[number]) => row.method },
  { key: 'amount', header: 'Montant', numeric: true, render: (row: (typeof INVOICES)[number]) => row.amount },
];

const MEMBERS = [
  { id: 'pm', name: 'Pulchérie Moussavou', email: 'p.moussavou@banda.dev', city: 'Libreville, Gabon', active: true, balance: 696000 },
  { id: 'ko', name: 'Karl Ondo', email: 'k.ondo@banda.dev', city: 'Port-Gentil, Gabon', active: true, balance: 600000 },
  { id: 'an', name: 'Aïcha Nzé', email: 'a.nze@banda.dev', city: 'Douala, Cameroun', active: false, balance: 650000 },
  { id: 'md', name: 'Mariam Diallo', email: 'm.diallo@banda.dev', city: 'Dakar, Sénégal', active: true, balance: 0 },
  { id: 'jb', name: 'Jean Boussougou', email: 'j.boussougou@banda.dev', city: 'Franceville, Gabon', active: true, balance: -100000 },
];

const FCFA = (value: number) =>
  `${value < 0 ? '-' : ''}${Math.abs(value).toLocaleString('fr-FR')} FCFA`;

export function TableDemo() {
  const [page, setPage] = useState(2);

  return (
    <>
      <Example title="Base composée (BandaTable.Head / .Body / .Foot)">
        <BandaTable>
          <BandaTable.Caption>Tableau par défaut.</BandaTable.Caption>
          <BandaTable.Head>
            <BandaTable.Row className="hover:bg-transparent">
              <BandaTable.Header>Facture</BandaTable.Header>
              <BandaTable.Header>Statut</BandaTable.Header>
              <BandaTable.Header>Moyen</BandaTable.Header>
              <BandaTable.Header align="end">Montant</BandaTable.Header>
            </BandaTable.Row>
          </BandaTable.Head>
          <BandaTable.Body>
            {INVOICES.map((invoice) => (
              <BandaTable.Row key={invoice.id}>
                <BandaTable.Cell className="font-medium">{invoice.id}</BandaTable.Cell>
                <BandaTable.Cell>{invoice.status}</BandaTable.Cell>
                <BandaTable.Cell>{invoice.method}</BandaTable.Cell>
                <BandaTable.Cell numeric>{invoice.amount}</BandaTable.Cell>
              </BandaTable.Row>
            ))}
          </BandaTable.Body>
          <BandaTable.Foot>
            <tr>
              <BandaTable.Cell colSpan={3}>Total</BandaTable.Cell>
              <BandaTable.Cell numeric>2 250 000 FCFA</BandaTable.Cell>
            </tr>
          </BandaTable.Foot>
        </BandaTable>
      </Example>
      <Example title="Composition — avatars & statuts">
        <BandaTable>
          <BandaTable.Caption>Tableau avec avatars.</BandaTable.Caption>
          <BandaTable.Body>
            {MEMBERS.slice(0, 3).map((member) => (
              <BandaTable.Row key={member.id}>
                <BandaTable.Cell className="font-medium">
                  <span className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-banda-primary-muted font-sans text-xs font-semibold text-banda-primary"
                      aria-hidden="true"
                    >
                      {member.name.split(' ').map((part) => part[0]).join('')}
                    </span>
                    {member.name}
                  </span>
                </BandaTable.Cell>
                <BandaTable.Cell>{member.email}</BandaTable.Cell>
                <BandaTable.Cell>{member.city}</BandaTable.Cell>
                <BandaTable.Cell>
                  <BandaBadge tone={member.active ? 'success' : 'neutral'}>
                    {member.active ? 'Actif' : 'Inactif'}
                  </BandaBadge>
                </BandaTable.Cell>
                <BandaTable.Cell numeric className={member.balance < 0 ? 'text-banda-danger' : ''}>
                  {FCFA(member.balance)}
                </BandaTable.Cell>
              </BandaTable.Row>
            ))}
          </BandaTable.Body>
        </BandaTable>
      </Example>
      <Example title="Modèle — DataTable + pagination">
        <div className="flex flex-col gap-4">
          <DataTable
            columns={INVOICE_COLUMNS}
            rows={INVOICES.slice((page - 1) * 3, page * 3)}
            rowKey={(row) => row.id}
            caption="Tableau paginé."
          />
          <TablePagination page={page} pageCount={3} onPageChange={setPage} />
        </div>
      </Example>
      <Example title="Modèle — DataTable avec sélection">
        <DataTable
          selectable
          defaultSelectedKeys={['pm']}
          selectionLabel={(row) => `Sélectionner ${row.name}`}
          columns={[
            { key: 'name', header: 'Nom', render: (row: (typeof MEMBERS)[number]) => row.name },
            { key: 'email', header: 'Email', render: (row: (typeof MEMBERS)[number]) => row.email },
            { key: 'city', header: 'Ville', render: (row: (typeof MEMBERS)[number]) => row.city },
            {
              key: 'status',
              header: 'Statut',
              render: (row: (typeof MEMBERS)[number]) => (
                <BandaBadge tone={row.active ? 'success' : 'neutral'}>
                  {row.active ? 'Actif' : 'Inactif'}
                </BandaBadge>
              ),
            },
            {
              key: 'balance',
              header: 'Solde',
              numeric: true,
              render: (row: (typeof MEMBERS)[number]) => (
                <span className={row.balance < 0 ? 'text-banda-danger' : ''}>{FCFA(row.balance)}</span>
              ),
            },
          ]}
          rows={MEMBERS}
          rowKey={(row) => row.id}
          footer={{ label: 'Total', value: FCFA(MEMBERS.reduce((sum, row) => sum + row.balance, 0)) }}
          caption="Tableau avec sélection de rangées."
        />
      </Example>
      <Example title="Modèle — tableau produits (actions)">
        <DataTable
          selectable
          selectionLabel={(row) => `Sélectionner ${row.name}`}
          columns={[
            {
              key: 'product',
              header: 'Produit',
              render: (row: ProductRow) => (
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-banda-surface-muted text-banda-text-muted"
                    aria-hidden="true"
                  >
                    <row.icon size={16} />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium">{row.name}</span>
                    <span className="text-xs text-banda-text-muted">{row.detail}</span>
                  </span>
                </span>
              ),
            },
            { key: 'color', header: 'Couleur', render: (row: ProductRow) => row.color },
            { key: 'category', header: 'Catégorie', render: (row: ProductRow) => row.category },
            { key: 'price', header: 'Prix', numeric: true, render: (row: ProductRow) => row.price },
            {
              key: 'actions',
              header: <span className="sr-only">Actions</span>,
              align: 'end',
              render: (row: ProductRow) => (
                <span className="flex justify-end gap-1">
                  <IconButton icon={Pencil} aria-label={`Modifier ${row.name}`} variant="ghost" />
                  <IconButton icon={Trash2} aria-label={`Supprimer ${row.name}`} variant="ghost" />
                  <IconButton icon={Archive} aria-label={`Archiver ${row.name}`} variant="ghost" />
                </span>
              ),
            },
          ]}
          rows={PRODUCTS}
          rowKey={(row) => row.id}
          caption="Tableau produits."
        />
      </Example>
    </>
  );
}

interface ProductRow {
  id: string;
  name: string;
  detail: string;
  color: string;
  category: string;
  price: string;
  icon: typeof Armchair;
}

const PRODUCTS: readonly ProductRow[] = [
  { id: 'p1', name: 'Chaise', detail: 'Chaise de jardin en bois', color: 'Noir', category: 'Mobilier', price: '169 000 FCFA', icon: Armchair },
  { id: 'p2', name: 'Baskets', detail: 'Rétro OG', color: 'Rouge', category: 'Chaussures', price: '95 000 FCFA', icon: Footprints },
  { id: 'p3', name: 'Smartphone', detail: '7 Pro', color: 'Bleu nébuleuse', category: 'Téléphonie', price: '545 000 FCFA', icon: Smartphone },
  { id: 'p4', name: 'Console', detail: 'Édition standard', color: 'Bleu et rouge', category: 'Jeux vidéo', price: '315 000 FCFA', icon: Gamepad2 },
  { id: 'p5', name: 'Souris', detail: 'Souris sans fil', color: 'Noir', category: 'Électronique', price: '70 000 FCFA', icon: Mouse },
];

const WIZARD_STEPS = [
  { label: 'Détails', icon: FileText },
  { label: 'Vérification', icon: Eye },
  { label: 'Terminé', icon: CircleCheck },
];

const WIZARD_CONTENT = [
  { title: 'Détails', text: 'Renseignez les informations requises pour cette étape.' },
  { title: 'Vérification', text: 'Confirmez vos informations et vos choix.' },
  { title: 'Terminé', text: 'Tout est prêt — vérification terminée.' },
];

export function StepperDemo() {
  const wizard = useStepper(WIZARD_STEPS.length);
  const form = useStepper(3);
  const wizardContent = WIZARD_CONTENT[wizard.current - 1];

  return (
    <>
      <Example title="Placements de labels">
        <div className="flex flex-col gap-8">
          <BandaStepper current={1} steps={[{}, {}, {}]} aria-label="Étapes sans label" />
          <BandaStepper
            current={1}
            steps={[{ label: 'Détails' }, { label: 'Confirmation' }, { label: 'Terminé' }]}
          />
          <BandaStepper
            current={1}
            steps={[
              { label: 'Compte', description: 'Créez un compte' },
              { label: 'Profil', description: 'Renseignez votre profil' },
              { label: 'Terminé', description: 'Finalisez la configuration' },
            ]}
          />
          <BandaStepper
            current={1}
            labelPlacement="end"
            steps={[{ label: 'Étape 1' }, { label: 'Étape 2' }, { label: 'Étape 3' }]}
          />
        </div>
      </Example>
      <Example title="Variantes & états">
        <div className="flex flex-col gap-8">
          <BandaStepper current={1} variant="outline" steps={[{}, {}, {}]} aria-label="Variante outline" />
          <BandaStepper current={2} steps={[{}, {}, {}]} aria-label="Étape 2 courante, étape 1 terminée" />
          <BandaStepper
            current={2}
            steps={[
              { label: 'Détails', icon: FileText },
              { label: 'Vérification', icon: Eye },
              { label: 'Terminé', icon: CircleCheck },
            ]}
          />
        </div>
      </Example>
      <Example title="Vertical (descriptions)">
        <BandaStepper
          orientation="vertical"
          current={2}
          steps={[
            { label: 'Détails', description: 'Renseignez les informations de cette étape.', icon: FileText },
            { label: 'Vérification', description: 'Confirmez vos informations et vos choix.', icon: Eye },
            { label: 'Terminé', description: 'Tout est prêt — vérification terminée.', icon: CircleCheck },
          ]}
        />
      </Example>
      <Example title="Wizard contrôlé (useStepper)">
        <div className="flex flex-col gap-6">
          <BandaStepper current={wizard.current} steps={WIZARD_STEPS} />
          <div className="flex flex-col gap-4 rounded-lg border border-dashed border-banda-border p-6 text-center">
            <h4 className="m-0 font-sans font-bold leading-tight tracking-tight text-banda-text text-lg">
              {wizardContent?.title}
            </h4>
            <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
              {wizardContent?.text}
            </p>
            <div className="flex justify-between">
              <BandaButton variant="outline" size="sm" disabled={wizard.isFirst} onClick={wizard.back}>
                <ArrowLeft size={14} aria-hidden="true" /> Retour
              </BandaButton>
              <BandaButton size="sm" disabled={wizard.isLast} onClick={wizard.next}>
                {wizard.isLast ? 'Envoyer' : 'Suivant'} <ArrowRight size={14} aria-hidden="true" />
              </BandaButton>
            </div>
          </div>
        </div>
      </Example>
      <Example title="Wizard formulaire (étapes + champs)">
        <div className="mx-auto flex max-w-md flex-col gap-6">
          <BandaStepper
            current={form.current}
            steps={[{ label: 'Identité' }, { label: 'Contact' }, { label: 'Adresse' }]}
          />
          <BandaForm onSubmitValues={() => form.next()}>
            {form.current === 1 ? (
              <>
                <BandaInput name="prenom" label="Prénom" placeholder="Pulchérie" />
                <BandaInput name="nom" label="Nom" placeholder="Moussavou" />
              </>
            ) : null}
            {form.current === 2 ? (
              <>
                <BandaInput name="email" type="email" label="Email" placeholder="p.moussavou@banda.dev" />
                <BandaInput name="telephone" type="tel" label="Téléphone" placeholder="+241 …" />
              </>
            ) : null}
            {form.current === 3 ? (
              <BandaInput name="ville" label="Ville" placeholder="Libreville" />
            ) : null}
            <FormActions align="end">
              <BandaButton type="button" variant="outline" size="sm" disabled={form.isFirst} onClick={form.back}>
                Retour
              </BandaButton>
              <BandaButton type="submit" size="sm">
                {form.isLast ? 'Terminer' : 'Suivant'}
              </BandaButton>
            </FormActions>
          </BandaForm>
        </div>
      </Example>
    </>
  );
}

const CHAT_MESSAGES = [
  { name: 'Pulchérie Moussavou', preview: 'Merci pour le retour…', time: '09:00', unread: 1 },
  { name: 'Karl Ondo', preview: "J'envoie les textes et…", time: '22:00', unread: 3 },
  { name: 'Aïcha Nzé', preview: 'Parfait, super !', time: '08:30', unread: 0 },
];

function Initials({ name }: { name: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-banda-surface-muted font-sans text-xs font-semibold text-banda-text"
      aria-hidden="true"
    >
      {name.split(' ').map((part) => part[0]).join('')}
    </span>
  );
}

function CheckboxMenuCell() {
  const [statusBar, setStatusBar] = useState(true);
  const [invites, setInvites] = useState(false);
  return (
    <BandaDropdownMenu trigger="Avec coches" label="Apparence">
      <BandaDropdownMenu.Label>Apparence</BandaDropdownMenu.Label>
      <BandaDropdownMenu.CheckboxItem checked={statusBar} onCheckedChange={setStatusBar}>
        Barre de statut
      </BandaDropdownMenu.CheckboxItem>
      <BandaDropdownMenu.CheckboxItem checked={false} disabled>
        API
      </BandaDropdownMenu.CheckboxItem>
      <BandaDropdownMenu.CheckboxItem checked={invites} onCheckedChange={setInvites}>
        Inviter des utilisateurs
      </BandaDropdownMenu.CheckboxItem>
    </BandaDropdownMenu>
  );
}

function RadioMenuCell() {
  const [position, setPosition] = useState('bottom');
  return (
    <BandaDropdownMenu trigger="Avec radios" label="Position du panneau">
      <BandaDropdownMenu.RadioGroup label="Position du panneau" value={position} onValueChange={setPosition}>
        <BandaDropdownMenu.RadioItem value="top">Haut</BandaDropdownMenu.RadioItem>
        <BandaDropdownMenu.RadioItem value="bottom">Bas</BandaDropdownMenu.RadioItem>
        <BandaDropdownMenu.RadioItem value="right" disabled>
          Droite
        </BandaDropdownMenu.RadioItem>
      </BandaDropdownMenu.RadioGroup>
    </BandaDropdownMenu>
  );
}

export function DropdownMenuDemo() {
  return (
    <>
      <Example title="Modèles — structure & contenus">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Basique (label, séparateur, désactivé)">
            <BandaDropdownMenu trigger="Basique" label="Mon compte">
              <BandaDropdownMenu.Label>Mon compte</BandaDropdownMenu.Label>
              <BandaDropdownMenu.Item>Profil</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>Facturation</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Separator />
              <BandaDropdownMenu.Item>GitHub</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>Support</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item disabled>API</BandaDropdownMenu.Item>
            </BandaDropdownMenu>
          </ModelCell>
          <ModelCell label="Items avec icônes + danger">
            <BandaDropdownMenu
              trigger={<Initials name="Pulchérie Moussavou" />}
              label="Mon compte"
              triggerClassName="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
            >
              <BandaDropdownMenu.Label>Mon compte</BandaDropdownMenu.Label>
              <BandaDropdownMenu.Item icon={User}>Profil</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item icon={Settings}>Paramètres</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item icon={Bell}>Notifications</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Separator />
              <BandaDropdownMenu.Item icon={LogOut} danger>
                Se déconnecter
              </BandaDropdownMenu.Item>
            </BandaDropdownMenu>
          </ModelCell>
          <ModelCell label="En-tête profil (modèle)">
            <BandaDropdownMenu trigger="Profil utilisateur" label="Profil utilisateur">
              <MenuProfileHeader name="Pulchérie Moussavou" email="p.moussavou@banda.dev" />
              <BandaDropdownMenu.Separator />
              <BandaDropdownMenu.Item>Profil</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>Facturation</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item disabled>API</BandaDropdownMenu.Item>
            </BandaDropdownMenu>
          </ModelCell>
          <ModelCell label="Items détaillés (modèle)">
            <BandaDropdownMenu
              trigger={<Pencil size={14} aria-hidden="true" />}
              label="Éditer le texte"
              menuClassName="min-w-64"
            >
              <BandaDropdownMenu.Label>Éditer le texte</BandaDropdownMenu.Label>
              <DetailedMenuItem icon={Heading1} title="Titre 1" description="Grande section ou titre principal" />
              <DetailedMenuItem icon={Heading2} title="Titre 2" description="Titre de sous-section" />
              <DetailedMenuItem icon={AlignJustify} title="Justifier" description="Le texte remplit toute la zone" />
              <DetailedMenuItem icon={TextSearch} title="Rechercher" description="Trouver n'importe quel texte" />
            </BandaDropdownMenu>
          </ModelCell>
          <ModelCell label="Raccourcis + align=end">
            <BandaDropdownMenu trigger="Aligné à droite" label="Fenêtres" align="end" menuClassName="min-w-56">
              <BandaDropdownMenu.Item shortcut="Ctrl T">Nouvel onglet</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item shortcut="Ctrl N">Nouvelle fenêtre</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Separator />
              <BandaDropdownMenu.Item shortcut="Ctrl H">Historique</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item shortcut="Ctrl J">Téléchargements</BandaDropdownMenu.Item>
            </BandaDropdownMenu>
          </ModelCell>
          <ModelCell label="Priorités (icônes colorées)">
            <BandaDropdownMenu trigger="Priorité" label="Priorité de la tâche">
              <BandaDropdownMenu.Label>Priorité de la tâche</BandaDropdownMenu.Label>
              <BandaDropdownMenu.Item icon={ChevronsUp} danger>
                <span className="text-banda-text">Très haute</span>
              </BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>
                <span className="flex items-center gap-2">
                  <ChevronUp size={14} className="text-banda-warning" aria-hidden="true" /> Haute
                </span>
              </BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>
                <span className="flex items-center gap-2">
                  <Equal size={14} className="text-banda-info" aria-hidden="true" /> Moyenne
                </span>
              </BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>
                <span className="flex items-center gap-2">
                  <ChevronsDown size={14} className="text-banda-success" aria-hidden="true" /> Basse
                </span>
              </BandaDropdownMenu.Item>
            </BandaDropdownMenu>
          </ModelCell>
        </div>
      </Example>
      <Example title="Modèles — états & contenus riches">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="CheckboxItem (le menu reste ouvert)">
            <CheckboxMenuCell />
          </ModelCell>
          <ModelCell label="RadioGroup / RadioItem">
            <RadioMenuCell />
          </ModelCell>
          <ModelCell label="SwitchMenuItem (notifications)">
            <BandaDropdownMenu trigger="Notifications" label="Notifications des applications" menuClassName="min-w-56">
              <BandaDropdownMenu.Label>Notifications des applications</BandaDropdownMenu.Label>
              <SwitchMenuItem label="Email" switchLabel="Notifications email" icon={Mail} defaultChecked />
              <SwitchMenuItem label="Agenda" switchLabel="Notifications agenda" icon={CalendarDays} />
              <SwitchMenuItem label="Messages" switchLabel="Notifications messages" icon={Send} defaultChecked />
            </BandaDropdownMenu>
          </ModelCell>
          <ModelCell label="Liste de discussions (composition)">
            <BandaDropdownMenu trigger="Discussions" label="Liste des discussions" menuClassName="min-w-72">
              <BandaDropdownMenu.Label>Liste des discussions</BandaDropdownMenu.Label>
              {CHAT_MESSAGES.map((chat) => (
                <BandaDropdownMenu.Item key={chat.name}>
                  <span className="flex w-full items-center gap-2">
                    <Initials name={chat.name} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{chat.name}</span>
                      <span className="truncate text-xs text-banda-text-muted">{chat.preview}</span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-xs text-banda-text-muted">{chat.time}</span>
                      {chat.unread > 0 ? (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-banda-success font-sans text-xs font-semibold text-banda-primary-contrast">
                          {chat.unread}
                        </span>
                      ) : null}
                    </span>
                  </span>
                </BandaDropdownMenu.Item>
              ))}
            </BandaDropdownMenu>
          </ModelCell>
          <ModelCell label="Animation slide-up">
            <BandaDropdownMenu trigger="Animé (slide)" label="Menu animé" animation="slide">
              <BandaDropdownMenu.Item>Mon profil</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>Paramètres</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>FAQ</BandaDropdownMenu.Item>
            </BandaDropdownMenu>
          </ModelCell>
          <ModelCell label="Animation zoom-in">
            <BandaDropdownMenu trigger="Animé (zoom)" label="Menu animé" animation="zoom">
              <BandaDropdownMenu.Item>Mon profil</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>Paramètres</BandaDropdownMenu.Item>
              <BandaDropdownMenu.Item>FAQ</BandaDropdownMenu.Item>
            </BandaDropdownMenu>
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

const TABS_TEXT =
  'Découvrez des idées fraîches, des sujets tendance et des pépites cachées sélectionnées pour vous.';

const TABS_BASE = [
  { value: 'explorer', label: 'Explorer' },
  { value: 'favoris', label: 'Favoris' },
  { value: 'surprise', label: 'Surprise' },
];

const TABS_ICONS = [
  { value: 'explorer', label: 'Explorer', icon: Bookmark },
  { value: 'favoris', label: 'Favoris', icon: Heart },
  { value: 'surprise', label: 'Surprise', icon: Gift },
];

const TABS_BADGES = [
  { value: 'explorer', label: 'Explorer', badge: 8 },
  { value: 'favoris', label: 'Favoris', badge: 3 },
  { value: 'surprise', label: 'Surprise', badge: 6 },
];

function TabsPanels() {
  return (
    <>
      <BandaTabs.Panel value="explorer">
        <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
          {TABS_TEXT}
        </p>
      </BandaTabs.Panel>
      <BandaTabs.Panel value="favoris">
        <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
          Vos favoris, regroupés au même endroit.
        </p>
      </BandaTabs.Panel>
      <BandaTabs.Panel value="surprise">
        <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
          Laissez la curiosité vous guider !
        </p>
      </BandaTabs.Panel>
    </>
  );
}

export function TabsDemo() {
  return (
    <>
      <Example title="Variantes">
        <div className="grid gap-8 md:grid-cols-2">
          <BandaTabs label="Variante segmented" tabs={TABS_BASE}>
            <TabsPanels />
          </BandaTabs>
          <BandaTabs label="Variante solid" variant="solid" tabs={TABS_BASE}>
            <TabsPanels />
          </BandaTabs>
          <BandaTabs label="Variante underline" variant="underline" tabs={TABS_BASE}>
            <TabsPanels />
          </BandaTabs>
          <BandaTabs label="Variante plain" variant="plain" tabs={TABS_BASE}>
            <TabsPanels />
          </BandaTabs>
        </div>
      </Example>
      <Example title="Icônes & badges">
        <div className="grid gap-8 md:grid-cols-2">
          <BandaTabs label="Onglets avec icônes" tabs={TABS_ICONS}>
            <TabsPanels />
          </BandaTabs>
          <BandaTabs label="Onglets avec badges" tabs={TABS_BADGES}>
            <TabsPanels />
          </BandaTabs>
          <BandaTabs label="Badges sur variante solid" variant="solid" tabs={TABS_BADGES}>
            <TabsPanels />
          </BandaTabs>
          <BandaTabs label="Icônes empilées" iconPosition="top" tabs={TABS_ICONS}>
            <TabsPanels />
          </BandaTabs>
        </div>
      </Example>
      <Example title="Vertical">
        <div className="grid gap-8 md:grid-cols-2">
          <BandaTabs label="Vertical avec icônes" orientation="vertical" tabs={TABS_ICONS}>
            <TabsPanels />
          </BandaTabs>
          <BandaTabs label="Vertical avec badges" orientation="vertical" variant="plain" tabs={TABS_BADGES}>
            <TabsPanels />
          </BandaTabs>
        </div>
      </Example>
    </>
  );
}

export function LabelDemo() {
  return (
    <>
      <Example title="Visible, requis, masqué">
        <div className="grid gap-4 md:grid-cols-3">
          <BandaInput label="Label visible" placeholder="…" />
          <BandaInput label="Label requis" required placeholder="…" />
          <BandaInput label="Label masqué (sr-only)" hideLabel placeholder="Label accessible mais invisible" />
        </div>
      </Example>
      <Example title="Modèles — labels décorés">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="InfoLabel (survolez l'icône)">
            <div className="w-full">
              <InfoLabel htmlFor="demo-client-id" info="Identifiant fourni lors de la création du client.">
                Client ID
              </InfoLabel>
              <BandaInput id="demo-client-id" hideLabel label="Client ID" placeholder="client_12**56" />
            </div>
          </ModelCell>
          <ModelCell label="BadgeLabel">
            <div className="w-full">
              <BadgeLabel htmlFor="demo-api" badge="Live" badgeTone="success">
                API Endpoint
              </BadgeLabel>
              <BandaInput id="demo-api" hideLabel label="API Endpoint" placeholder="https://api.banda.dev/v1" />
            </div>
          </ModelCell>
          <ModelCell label="StatusDotLabel">
            <div className="w-full">
              <StatusDotLabel htmlFor="demo-server" status="success" statusLabel="En ligne">
                Statut du serveur
              </StatusDotLabel>
              <BandaSelect
                id="demo-server"
                label="Statut du serveur"
                hideLabel
                options={[
                  { value: 'online', label: 'En ligne' },
                  { value: 'offline', label: 'Hors ligne' },
                ]}
                defaultValue="online"
              />
            </div>
          </ModelCell>
          <ModelCell label="EditableLabel (cliquez le crayon)">
            <EditableLabel label="Nom du projet" defaultValue="mon-app-banda" className="w-full" />
          </ModelCell>
          <ModelCell label="Label + contrôles à libellé intégré">
            <div className="flex w-full flex-col gap-3">
              <BandaCheckbox label="J'accepte les conditions" />
              <BandaSwitch label="Ne pas déranger" />
            </div>
          </ModelCell>
          <ModelCell label="Composition formulaire">
            <form className="flex w-full flex-col gap-3" onSubmit={(event) => event.preventDefault()}>
              <BandaInput label="Nom" placeholder="Votre nom" />
              <BandaInput label="Email" type="email" placeholder="Votre email" />
              <BandaButton type="submit" className="w-full">
                Envoyer
              </BandaButton>
            </form>
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

export function BadgeDemo() {
  const tones = ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;
  return (
    <>
      <Example title="Grille tone × fill (recolorable par tokens)">
        <div className="flex flex-col gap-3">
          {(['solid', 'soft', 'outline'] as const).map((fill) => (
            <div key={fill} className="flex flex-wrap items-center gap-2">
              <span className="w-14 font-sans text-xs text-banda-text-muted">{fill}</span>
              {tones.map((tone) => (
                <BandaBadge key={tone} tone={tone} fill={fill}>
                  {tone}
                </BandaBadge>
              ))}
            </div>
          ))}
        </div>
      </Example>
      <Example title="Tailles & formes">
        <div className="flex flex-wrap items-center gap-3">
          <BandaBadge tone="primary" fill="solid" size="sm">Small</BandaBadge>
          <BandaBadge tone="primary" fill="solid" size="md">Medium</BandaBadge>
          <BandaBadge tone="primary" fill="solid" size="lg">Large</BandaBadge>
          <BandaBadge tone="primary" fill="solid" square>Square</BandaBadge>
          <CountBadge count={8} />
          <CountBadge count={120} tone="danger" />
        </div>
      </Example>
      <Example title="Modèles">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Avec icône">
            <BandaBadge tone="primary" fill="solid">
              <Star size={12} aria-hidden="true" /> With Icon
            </BandaBadge>
          </ModelCell>
          <ModelCell label="LinkBadge (<a>)">
            <LinkBadge href="#/c/badge">Link</LinkBadge>
          </ModelCell>
          <ModelCell label="ClosableBadge (cliquez la croix)">
            <ClosableBadge tone="primary" fill="solid">Closable</ClosableBadge>
          </ModelCell>
          <ModelCell label="SelectableBadge (cliquez)">
            <div className="flex gap-2">
              <SelectableBadge>Design</SelectableBadge>
              <SelectableBadge defaultSelected>Front</SelectableBadge>
            </div>
          </ModelCell>
          <ModelCell label="GradientBadge">
            <GradientBadge>Gradient</GradientBadge>
          </ModelCell>
          <ModelCell label="GradientOutlineBadge">
            <GradientOutlineBadge>Gradient Outline</GradientOutlineBadge>
          </ModelCell>
        </div>
      </Example>
      <Example title="Statuts">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <DotBadge tone="warning">In Progress</DotBadge>
            <DotBadge tone="danger">Blocked</DotBadge>
            <DotBadge tone="success">Completed</DotBadge>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="pending">Pending</StatusBadge>
            <StatusBadge status="failed">Failed</StatusBadge>
            <StatusBadge status="success">Successful</StatusBadge>
          </div>
        </div>
      </Example>
    </>
  );
}

export function CardDemo() {
  const { show } = useToast();
  return (
    <>
      <Example title="Compositions (base <article> composée)">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <BandaCard className="mx-auto w-full max-w-sm">
            <BandaCard.Header>
              <BandaCard.Title>Connectez-vous</BandaCard.Title>
              <BandaCard.Description>
                Saisissez votre email pour accéder à votre compte.
              </BandaCard.Description>
            </BandaCard.Header>
            <BandaCard.Body>
              <BandaForm onSubmitValues={() => show({ message: 'Connexion réussie.', variant: 'success' })}>
                <BandaInput name="email" type="email" label="Email" placeholder="vous@exemple.dev" required />
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <BandaLabel htmlFor="card-password">Mot de passe</BandaLabel>
                    <a href="#/c/card" className="font-sans text-xs text-banda-text-muted underline hover:text-banda-text">
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <BandaInput id="card-password" hideLabel label="Mot de passe" name="password" type="password" sanitize={false} required />
                </div>
                <BandaButton type="submit" className="w-full">
                  Se connecter
                </BandaButton>
                <SocialButton provider="google" />
              </BandaForm>
            </BandaCard.Body>
            <BandaCard.Footer className="justify-center">
              <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                Pas encore de compte ?{' '}
                <a href="#/c/card" className="text-banda-text underline">
                  Créer un compte
                </a>
              </p>
            </BandaCard.Footer>
          </BandaCard>
          <BandaCard className="w-full">
            <BandaCard.Header>
              <BandaCard.Title>Notes de réunion</BandaCard.Title>
              <BandaCard.Description>
                Compte-rendu de la réunion avec le client.
              </BandaCard.Description>
            </BandaCard.Header>
            <BandaCard.Body className="flex flex-col gap-3">
              <p className="m-0 font-sans leading-normal text-sm text-banda-text">
                Le client demande une refonte du tableau de bord, orientée mobile.
              </p>
              <ol className="m-0 flex list-decimal flex-col gap-1 pl-5 font-sans text-sm text-banda-text">
                <li>Nouveaux widgets d'analyse quotidienne/hebdomadaire</li>
                <li>Menu de navigation simplifié</li>
                <li>Prise en charge du mode sombre</li>
                <li>Délai : 6 semaines</li>
                <li>Réunion de suivi mardi prochain</li>
              </ol>
            </BandaCard.Body>
            <BandaCard.Footer>
              <span className="flex -space-x-2">
                {['Pulchérie Moussavou', 'Karl Ondo', 'Aïcha Nzé', 'Jean Boussougou'].map((name) => (
                  <span
                    key={name}
                    title={name}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-banda-surface bg-banda-primary-muted font-sans text-xs font-semibold text-banda-primary"
                  >
                    {name.split(' ').map((part) => part[0]).join('')}
                  </span>
                ))}
              </span>
            </BandaCard.Footer>
          </BandaCard>
        </div>
      </Example>
      <Example title="Compositions — médias & marketing">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          <BandaCard className="mb-6 break-inside-avoid">
            <BandaCard.Media>
              <div className="h-48 w-full bg-gradient-to-br from-banda-info to-banda-secondary" aria-hidden="true" />
            </BandaCard.Media>
          </BandaCard>
          <BandaCard className="mb-6 break-inside-avoid">
            <BandaCard.Media className="relative">
              <div className="h-56 w-full bg-gradient-to-br from-banda-secondary to-banda-text" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
                <span className="font-sans text-md font-semibold text-banda-surface">
                  Océans d'ailleurs
                </span>
                <div className="flex gap-2">
                  <BandaButton size="sm">Acheter</BandaButton>
                  <BandaButton size="sm" variant="outline" className="!border-banda-surface !text-banda-surface">
                    Télécharger
                  </BandaButton>
                </div>
              </div>
            </BandaCard.Media>
          </BandaCard>
          <BandaCard className="mb-6 break-inside-avoid flex items-stretch">
            <div className="flex flex-1 flex-col">
              <BandaCard.Header className="pb-2">
                <BandaCard.Title className="text-md">Crépuscule cramoisi</BandaCard.Title>
                <BandaCard.Description>Dégradé du soir en pur CSS.</BandaCard.Description>
              </BandaCard.Header>
              <BandaCard.Footer className="mt-auto">
                <BandaButton size="sm" variant="secondary">
                  Explorer
                </BandaButton>
              </BandaCard.Footer>
            </div>
            <div className="w-28 shrink-0 rounded-r-lg bg-gradient-to-b from-banda-danger to-banda-secondary" aria-hidden="true" />
          </BandaCard>
          <BandaCard className="mb-6 break-inside-avoid bg-gradient-to-r from-banda-secondary to-banda-info">
            <BandaCard.Header>
              <BandaCard.Title className="!text-banda-surface">Gadget créatif</BandaCard.Title>
              <BandaCard.Description className="!text-banda-surface">
                Une bannière promotionnelle sur dégradé de tokens.
              </BandaCard.Description>
            </BandaCard.Header>
            <BandaCard.Footer>
              <BandaButton size="sm" variant="secondary">
                Découvrir
              </BandaButton>
            </BandaCard.Footer>
          </BandaCard>
          <BandaCard className="mb-6 break-inside-avoid">
            <BandaCard.Body className="pt-6">
              <BandaTabs
                label="Sections de la carte"
                tabs={[
                  { value: 'apercu', label: 'Aperçu' },
                  { value: 'profil', label: 'Profil' },
                  { value: 'membres', label: 'Membres' },
                ]}
              >
                <BandaTabs.Panel value="apercu">
                  <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                    Les onglets organisent le contenu de la carte sans la quitter.
                  </p>
                </BandaTabs.Panel>
                <BandaTabs.Panel value="profil">
                  <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                    Renseignez votre profil et vos préférences.
                  </p>
                </BandaTabs.Panel>
                <BandaTabs.Panel value="membres">
                  <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                    Gérez les membres et leurs rôles.
                  </p>
                </BandaTabs.Panel>
              </BandaTabs>
            </BandaCard.Body>
          </BandaCard>
          <BandaCard className="mb-6 break-inside-avoid">
            <BandaCard.Header className="flex-row items-center gap-3 pb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-banda-primary-muted font-sans text-xs font-semibold text-banda-primary" aria-hidden="true">
                PM
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center gap-1 font-sans text-sm font-medium text-banda-text">
                  Pulchérie Moussavou
                  <BadgeCheck size={14} className="shrink-0 text-banda-info" aria-label="Compte certifié" />
                </span>
                <span className="font-sans text-xs text-banda-text-muted">@pulcherie</span>
              </span>
              <BandaButton size="sm" variant="outline">
                <UserPlus size={14} aria-hidden="true" /> Suivre
              </BandaButton>
              <IconButton icon={Ellipsis} aria-label="Plus d'options" variant="ghost" />
            </BandaCard.Header>
            <BandaCard.Media>
              <div className="h-40 w-full bg-gradient-to-br from-banda-info via-banda-secondary to-banda-text" aria-hidden="true" />
            </BandaCard.Media>
            <BandaCard.Body className="pt-4">
              <p className="m-0 font-sans leading-normal text-sm text-banda-text">
                Perdue dans les couleurs de la nuit — parfois le flou révèle plus que la netteté.{' '}
                <span className="text-banda-info">#VibesAbstraites</span>{' '}
                <span className="text-banda-info">#PoésieVisuelle</span>
              </p>
            </BandaCard.Body>
            <BandaCard.Footer className="gap-4">
              <span className="flex items-center gap-1 font-sans text-xs text-banda-text-muted">
                <Heart size={14} className="fill-current text-banda-danger" aria-hidden="true" /> 2,1 k
              </span>
              <span className="flex items-center gap-1 font-sans text-xs text-banda-text-muted">
                <MessageCircle size={14} aria-hidden="true" /> 1,4 k
              </span>
              <span className="flex items-center gap-1 font-sans text-xs text-banda-text-muted">
                <Repeat2 size={14} aria-hidden="true" /> 669
              </span>
              <span className="flex items-center gap-1 font-sans text-xs text-banda-text-muted">
                <Send size={14} aria-hidden="true" /> 1,1 k
              </span>
            </BandaCard.Footer>
          </BandaCard>
          <BandaCard className="mb-6 break-inside-avoid overflow-hidden">
            <BandaCard.Media className="relative">
              <div className="h-52 w-full bg-gradient-to-br from-banda-secondary to-banda-info" aria-hidden="true" />
              <button
                type="button"
                aria-label="Ajouter aux favoris"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-banda-surface text-banda-text-muted transition-colors duration-fast hover:text-banda-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
              >
                <Heart size={14} aria-hidden="true" />
              </button>
            </BandaCard.Media>
            <div className="relative -mt-6 flex flex-col gap-3 rounded-t-lg bg-banda-surface p-6">
              <BandaCard.Title className="text-md">Sandales Akanda</BandaCard.Title>
              <span className="flex gap-2">
                <BandaBadge>EU 38</BandaBadge>
                <BandaBadge>Noir et blanc</BandaBadge>
              </span>
              <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                Le confort des parquets avec l'allure du bitume — construction inspirée des
                années 80, détails affirmés, style assuré.
              </p>
              <span className="flex flex-wrap items-end justify-between gap-2">
                <span className="flex flex-col">
                  <span className="font-sans text-xs font-medium uppercase tracking-wide text-banda-text-muted">
                    Prix
                  </span>
                  <span className="whitespace-nowrap font-sans text-lg font-semibold text-banda-text">35 000 FCFA</span>
                </span>
                <BandaButton size="sm" className="shrink-0 whitespace-nowrap">
                  <ShoppingCart size={14} aria-hidden="true" /> Ajouter au panier
                </BandaButton>
              </span>
            </div>
          </BandaCard>
          <BandaCard className="mb-6 break-inside-avoid">
            <BandaCard.Body className="flex flex-col gap-3 pt-6">
              <p className="m-0 font-sans leading-normal text-sm text-banda-text">
                « Ce starter nous a fait gagner des semaines : tokens, accessibilité et sanitize par
                défaut, tout y est. »
              </p>
              <span className="flex gap-0.5" role="img" aria-label="4 étoiles sur 5">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} size={14} className="fill-current text-banda-warning" aria-hidden="true" />
                ))}
                <Star size={14} className="text-banda-border-strong" aria-hidden="true" />
              </span>
              <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                Mariam Diallo — Lead front, Dakar
              </p>
            </BandaCard.Body>
          </BandaCard>
          <BandaCard className="mb-6 break-inside-avoid border-banda-text bg-banda-text">
            <BandaCard.Header>
              <BandaCard.Title className="!text-banda-surface">Comment démarre un projet ?</BandaCard.Title>
              <BandaCard.Description className="!text-banda-surface">
                Parlons de vos besoins — réponse sous 24 h.
              </BandaCard.Description>
            </BandaCard.Header>
            <BandaCard.Footer>
              <BandaButton size="sm" variant="secondary">
                Discutons-en <ArrowRight size={14} aria-hidden="true" />
              </BandaButton>
            </BandaCard.Footer>
          </BandaCard>
        </div>
      </Example>
      <Example title="Composition — vitrine (trio d'images)">
        {/* Une SEULE carte continue : images en pleine largeur collées en haut,
            segments séparés par les traits internes (divide), comme la référence. */}
        <BandaCard className="overflow-hidden">
          <div className="grid divide-y divide-banda-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {[
              {
                title: 'Tourbillon bleu mystique',
                text: 'Plongez dans un tourbillon envoûtant où bleus vibrants et roses doux fusionnent en un flux hypnotique.',
                gradient: 'from-banda-info to-banda-secondary',
              },
              {
                title: 'Coucher de soleil ardent',
                text: "La chaleur d'un soleil rayonnant : rouges, oranges et jaunes s'enchaînent dans un halo abstrait.",
                gradient: 'from-banda-danger to-banda-warning',
              },
              {
                title: 'Vagues bleues cosmiques',
                text: "Explorez les mystères du cosmos : vagues profondes de bleu et de violet, sensation d'espace infini.",
                gradient: 'from-banda-info to-banda-text',
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col">
                <div
                  className={`h-52 w-full bg-gradient-to-br ${item.gradient}`}
                  aria-hidden="true"
                />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <BandaCard.Title className="text-md">{item.title}</BandaCard.Title>
                  <BandaCard.Description>{item.text}</BandaCard.Description>
                  <div className="mt-auto flex gap-2 pt-3">
                    <BandaButton size="sm">Explorer</BandaButton>
                    <BandaButton size="sm" variant="outline">
                      Télécharger
                    </BandaButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BandaCard>
      </Example>
      <Example title="Modèles — animés (survolez)">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <GlowCard className="mx-auto w-full max-w-sm">
            <BandaCard.Header>
              <BandaCard.Title>Survolez pour le halo</BandaCard.Title>
            </BandaCard.Header>
            <BandaCard.Body>
              <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                Glissez votre curseur ici et regardez la magie opérer — une expérience pensée pour vous.
              </p>
            </BandaCard.Body>
          </GlowCard>
          <TiltCard className="mx-auto w-full max-w-sm">
            <BandaCard.Header>
              <BandaCard.Title>Carte 3D dynamique</BandaCard.Title>
            </BandaCard.Header>
            <BandaCard.Body className="flex flex-col gap-3">
              <div className="h-40 w-full rounded-md bg-gradient-to-br from-banda-warning to-banda-danger" aria-hidden="true" />
              <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                Profondeur et mouvement interactifs — déplacez votre curseur pour la voir s'animer !
              </p>
            </BandaCard.Body>
          </TiltCard>
        </div>
      </Example>
    </>
  );
}

/** Cellule de démo dialog : bouton déclencheur + rendu contrôlé. */
function DialogCell({
  trigger,
  children,
}: {
  trigger: string;
  children: (open: boolean, close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BandaButton variant="outline" size="sm" onClick={() => setOpen(true)}>
        {trigger}
      </BandaButton>
      {children(open, () => setOpen(false))}
    </>
  );
}

const LOREM_TERMS = Array.from(
  { length: 12 },
  (_, index) =>
    `${index + 1}. Banda signifie « commencement » en Yipunu : chaque clause de ces conditions illustre le défilement du corps du dialogue pendant que l'en-tête et le pied restent visibles.`,
);

export function DialogDemo() {
  const { show } = useToast();
  return (
    <>
      <Example title="Modèle — AlertDialog">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Confirmation">
            <DialogCell trigger="Alert dialog">
              {(open, close) => (
                <AlertDialog
                  open={open}
                  onClose={close}
                  title="Êtes-vous sûr ?"
                  description="Cette action ne peut pas être annulée."
                  onConfirm={() => show({ message: 'Action confirmée.', variant: 'success' })}
                />
              )}
            </DialogCell>
          </ModelCell>
          <ModelCell label="Avec icône">
            <DialogCell trigger="Alert dialog (icône)">
              {(open, close) => (
                <AlertDialog
                  open={open}
                  onClose={close}
                  icon={CircleAlert}
                  title="Mise à jour disponible"
                  description="Une nouvelle version de l'application est disponible. Mettez à jour pour profiter des nouveautés."
                  confirmLabel="Mettre à jour"
                >
                  <ol className="m-0 flex list-decimal flex-col gap-1 pl-5 text-left font-sans text-sm text-banda-text">
                    <li>Nouveaux widgets d'analyse</li>
                    <li>Menu de navigation simplifié</li>
                    <li>Prise en charge du mode sombre</li>
                  </ol>
                </AlertDialog>
              )}
            </DialogCell>
          </ModelCell>
          <ModelCell label="Destructive">
            <DialogCell trigger="Alert destructive">
              {(open, close) => (
                <AlertDialog
                  open={open}
                  onClose={close}
                  icon={Trash2}
                  destructive
                  align="center"
                  title="Supprimer le projet ?"
                  description="Cette action ne peut pas être annulée. Le projet et toutes ses données seront définitivement supprimés."
                  confirmLabel="Supprimer"
                  onConfirm={() => show({ message: 'Projet supprimé.', variant: 'info' })}
                >
                  <div className="flex justify-center">
                    <BandaCheckbox label="Ne plus me demander" />
                  </div>
                </AlertDialog>
              )}
            </DialogCell>
          </ModelCell>
        </div>
      </Example>
      <Example title="Défilement, plein écran & animations">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Corps défilant (dividers)">
            <DialogCell trigger="Conditions d'utilisation">
              {(open, close) => (
                <BandaDialog
                  open={open}
                  onClose={close}
                  dividers
                  title="Conditions d'utilisation"
                  description="En-tête et pied restent visibles, le corps défile."
                  className="max-h-96"
                  footer={
                    <>
                      <BandaButton variant="outline" size="sm" onClick={close}>
                        Refuser
                      </BandaButton>
                      <BandaButton size="sm" onClick={close}>
                        Accepter
                      </BandaButton>
                    </>
                  }
                >
                  <div className="flex flex-col gap-3">
                    {LOREM_TERMS.map((clause) => (
                      <p key={clause} className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                        {clause}
                      </p>
                    ))}
                  </div>
                </BandaDialog>
              )}
            </DialogCell>
          </ModelCell>
          <ModelCell label="Plein écran">
            <DialogCell trigger="Plein écran">
              {(open, close) => (
                <BandaDialog
                  open={open}
                  onClose={close}
                  size="fullscreen"
                  title="Dialogue plein écran"
                  description="Pour les flux immersifs (éditeurs, aperçus…)."
                >
                  <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                    Échap ou la croix pour fermer.
                  </p>
                </BandaDialog>
              )}
            </DialogCell>
          </ModelCell>
          <ModelCell label="Animations zoom / slide">
            <div className="flex flex-col items-center gap-2">
              <DialogCell trigger="Zoom in">
                {(open, close) => (
                  <BandaDialog open={open} onClose={close} animation="zoom" title="Animation zoom-in">
                    <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                      Keyframes banda-zoom-in du preset.
                    </p>
                  </BandaDialog>
                )}
              </DialogCell>
              <DialogCell trigger="Slide up">
                {(open, close) => (
                  <BandaDialog open={open} onClose={close} animation="slide" title="Animation slide-up">
                    <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
                      Keyframes banda-slide-up du preset.
                    </p>
                  </BandaDialog>
                )}
              </DialogCell>
            </div>
          </ModelCell>
        </div>
      </Example>
      <Example title="Compositions — formulaires">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCell label="Abonnement (BandaForm)">
            <DialogCell trigger="S'abonner">
              {(open, close) => (
                <BandaDialog open={open} onClose={close} title="Restez informé·e" description="Recevez nos nouveautés, sans spam.">
                  <BandaForm
                    onSubmitValues={() => {
                      close();
                      show({ message: 'Abonnement confirmé.', variant: 'success' });
                    }}
                  >
                    <BandaInput name="email" type="email" label="Email" placeholder="vous@exemple.dev" required />
                    <FormActions align="end">
                      <BandaButton type="submit" size="sm">
                        S'abonner
                      </BandaButton>
                    </FormActions>
                  </BandaForm>
                </BandaDialog>
              )}
            </DialogCell>
          </ModelCell>
          <ModelCell label="Notation (étoiles)">
            <DialogCell trigger="Noter l'application">
              {(open, close) => (
                <BandaDialog
                  open={open}
                  onClose={close}
                  title="Votre avis compte"
                  description="Comment évaluez-vous votre expérience ?"
                  footer={
                    <BandaButton size="sm" onClick={close}>
                      Envoyer
                    </BandaButton>
                  }
                >
                  <div className="flex justify-center gap-1">
                    {['1 étoile', '2 étoiles', '3 étoiles', '4 étoiles', '5 étoiles'].map((label) => (
                      <IconCheckbox key={label} icon={Star} label={label} color="warning" />
                    ))}
                  </div>
                </BandaDialog>
              )}
            </DialogCell>
          </ModelCell>
          <ModelCell label="Code OTP">
            <DialogCell trigger="Saisir le code">
              {(open, close) => (
                <BandaDialog open={open} onClose={close} size="sm" title="Vérification" description="Saisissez le code à 4 chiffres reçu par SMS.">
                  <BandaForm
                    onSubmitValues={() => {
                      close();
                      show({ message: 'Code vérifié.', variant: 'success' });
                    }}
                  >
                    <div className="flex justify-center gap-2">
                      {['1er', '2e', '3e', '4e'].map((position) => (
                        <BandaInput
                          key={position}
                          hideLabel
                          label={`${position} chiffre`}
                          name={`otp-${position}`}
                          inputMode="numeric"
                          maxLength={1}
                          className="w-10"
                          inputClassName="text-center"
                        />
                      ))}
                    </div>
                    <FormActions align="end">
                      <BandaButton type="submit" size="sm">
                        Vérifier
                      </BandaButton>
                    </FormActions>
                  </BandaForm>
                </BandaDialog>
              )}
            </DialogCell>
          </ModelCell>
        </div>
      </Example>
    </>
  );
}

export function ToastDemo() {
  const { show } = useToast();
  return (
    <Example title="4 variants + persistant">
      <div className="flex flex-wrap gap-3">
        <BandaButton variant="outline" onClick={() => show({ message: 'Information.', variant: 'info' })}>
          Info
        </BandaButton>
        <BandaButton variant="outline" onClick={() => show({ message: 'Profil enregistré.', variant: 'success' })}>
          Succès
        </BandaButton>
        <BandaButton variant="outline" onClick={() => show({ message: 'Connexion instable…', variant: 'warning' })}>
          Avertissement
        </BandaButton>
        <BandaButton
          variant="outline"
          onClick={() => show({ message: 'Échec de la sauvegarde.', variant: 'danger', durationMs: null })}
        >
          Persistant
        </BandaButton>
      </div>
    </Example>
  );
}

export function TypographyDemo() {
  return (
    <Example title="Échelle">
      <div className="flex flex-col gap-2">
        <h2 className="m-0 font-sans font-bold leading-tight tracking-tight text-banda-text text-4xl">
          Heading 2xl
        </h2>
        <h3 className="m-0 font-sans font-bold leading-tight tracking-tight text-banda-text text-3xl">
          Heading xl
        </h3>
        <h3 className="m-0 font-sans font-bold leading-tight tracking-tight text-banda-text text-2xl">
          Heading lg
        </h3>
        <p className="m-0 font-sans leading-normal text-lg text-banda-text">Text lg — Banda signifie « commencement » en Yipunu.</p>
        <p className="m-0 font-sans leading-normal text-banda-text">Text md — taille de lecture par défaut.</p>
        <p className="m-0 font-sans leading-normal text-sm text-banda-text-muted">
          Text sm muted — contenus secondaires.
        </p>
      </div>
    </Example>
  );
}
