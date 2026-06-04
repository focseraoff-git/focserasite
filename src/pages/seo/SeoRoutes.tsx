// src/pages/seo/SeoRoutes.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const BirthdayEventPlanning = React.lazy(() => import('./BirthdayEventPlanning'));
const BirthdayEventPlanningGachibowli = React.lazy(() => import('./BirthdayEventPlanningGachibowli'));
const BirthdayEventPlanningSecunderabad = React.lazy(() => import('./BirthdayEventPlanningSecunderabad'));
const BirthdayEventPlanningKondapur = React.lazy(() => import('./BirthdayEventPlanningKondapur'));
const BirthdayEventPlanningJubileeHills = React.lazy(() => import('./BirthdayEventPlanningJubileeHills'));
const BirthdayEventPlanningMadhapur = React.lazy(() => import('./BirthdayEventPlanningMadhapur'));
const BirthdayEventPlanningBanjaraHills = React.lazy(() => import('./BirthdayEventPlanningBanjaraHills'));
const BirthdayEventPlanningKukatpally = React.lazy(() => import('./BirthdayEventPlanningKukatpally'));
const PhotographyServices = React.lazy(() => import('./PhotographyServices'));
const PhotographyServicesGachibowli = React.lazy(() => import('./PhotographyServicesGachibowli'));
const PhotographyServicesSecunderabad = React.lazy(() => import('./PhotographyServicesSecunderabad'));
const PhotographyServicesKondapur = React.lazy(() => import('./PhotographyServicesKondapur'));
const PhotographyServicesJubileeHills = React.lazy(() => import('./PhotographyServicesJubileeHills'));
const PhotographyServicesMadhapur = React.lazy(() => import('./PhotographyServicesMadhapur'));
const PhotographyServicesBanjaraHills = React.lazy(() => import('./PhotographyServicesBanjaraHills'));
const PhotographyServicesKukatpally = React.lazy(() => import('./PhotographyServicesKukatpally'));
const KidsBirthdayPartyPlannersHyderabad = React.lazy(() => import('./KidsBirthdayPartyPlannersHyderabad'));
const KidsBirthdayPartyPlannersGachibowli = React.lazy(() => import('./KidsBirthdayPartyPlannersGachibowli'));
const KidsBirthdayPartyPlannersSecunderabad = React.lazy(() => import('./KidsBirthdayPartyPlannersSecunderabad'));
const KidsBirthdayPartyPlannersKondapur = React.lazy(() => import('./KidsBirthdayPartyPlannersKondapur'));
const KidsBirthdayPartyPlannersJubileeHills = React.lazy(() => import('./KidsBirthdayPartyPlannersJubileeHills'));
const KidsBirthdayPartyPlannersMadhapur = React.lazy(() => import('./KidsBirthdayPartyPlannersMadhapur'));
const KidsBirthdayPartyPlannersBanjaraHills = React.lazy(() => import('./KidsBirthdayPartyPlannersBanjaraHills'));
const KidsBirthdayPartyPlannersKukatpally = React.lazy(() => import('./KidsBirthdayPartyPlannersKukatpally'));
const CorporateEventPlannersHyderabad = React.lazy(() => import('./CorporateEventPlannersHyderabad'));
const CorporateEventPlannersGachibowli = React.lazy(() => import('./CorporateEventPlannersGachibowli'));
const CorporateEventPlannersSecunderabad = React.lazy(() => import('./CorporateEventPlannersSecunderabad'));
const CorporateEventPlannersKondapur = React.lazy(() => import('./CorporateEventPlannersKondapur'));
const CorporateEventPlannersJubileeHills = React.lazy(() => import('./CorporateEventPlannersJubileeHills'));
const CorporateEventPlannersMadhapur = React.lazy(() => import('./CorporateEventPlannersMadhapur'));
const CorporateEventPlannersBanjaraHills = React.lazy(() => import('./CorporateEventPlannersBanjaraHills'));
const CorporateEventPlannersKukatpally = React.lazy(() => import('./CorporateEventPlannersKukatpally'));
const RoomRenovationInteriorDesignHyderabad = React.lazy(() => import('./RoomRenovationInteriorDesignHyderabad'));
const RoomRenovationInteriorDesignGachibowli = React.lazy(() => import('./RoomRenovationInteriorDesignGachibowli'));
const RoomRenovationInteriorDesignSecunderabad = React.lazy(() => import('./RoomRenovationInteriorDesignSecunderabad'));
const RoomRenovationInteriorDesignKondapur = React.lazy(() => import('./RoomRenovationInteriorDesignKondapur'));
const RoomRenovationInteriorDesignJubileeHills = React.lazy(() => import('./RoomRenovationInteriorDesignJubileeHills'));
const RoomRenovationInteriorDesignMadhapur = React.lazy(() => import('./RoomRenovationInteriorDesignMadhapur'));
const RoomRenovationInteriorDesignBanjaraHills = React.lazy(() => import('./RoomRenovationInteriorDesignBanjaraHills'));
const RoomRenovationInteriorDesignKukatpally = React.lazy(() => import('./RoomRenovationInteriorDesignKukatpally'));
const LivingRoomInteriorDesignHyderabad = React.lazy(() => import('./LivingRoomInteriorDesignHyderabad'));
const LivingRoomInteriorDesignGachibowli = React.lazy(() => import('./LivingRoomInteriorDesignGachibowli'));
const LivingRoomInteriorDesignSecunderabad = React.lazy(() => import('./LivingRoomInteriorDesignSecunderabad'));
const LivingRoomInteriorDesignKondapur = React.lazy(() => import('./LivingRoomInteriorDesignKondapur'));
const LivingRoomInteriorDesignJubileeHills = React.lazy(() => import('./LivingRoomInteriorDesignJubileeHills'));
const LivingRoomInteriorDesignMadhapur = React.lazy(() => import('./LivingRoomInteriorDesignMadhapur'));
const LivingRoomInteriorDesignBanjaraHills = React.lazy(() => import('./LivingRoomInteriorDesignBanjaraHills'));
const LivingRoomInteriorDesignKukatpally = React.lazy(() => import('./LivingRoomInteriorDesignKukatpally'));
const InteriorDesignersHyderabad = React.lazy(() => import('./InteriorDesignersHyderabad'));
const InteriorDesignersGachibowli = React.lazy(() => import('./InteriorDesignersGachibowli'));
const InteriorDesignersSecunderabad = React.lazy(() => import('./InteriorDesignersSecunderabad'));
const InteriorDesignersKondapur = React.lazy(() => import('./InteriorDesignersKondapur'));
const InteriorDesignersJubileeHills = React.lazy(() => import('./InteriorDesignersJubileeHills'));
const InteriorDesignersMadhapur = React.lazy(() => import('./InteriorDesignersMadhapur'));
const InteriorDesignersBanjaraHills = React.lazy(() => import('./InteriorDesignersBanjaraHills'));
const InteriorDesignersKukatpally = React.lazy(() => import('./InteriorDesignersKukatpally'));
const ReelsVideoShootServicesHyderabad = React.lazy(() => import('./ReelsVideoShootServicesHyderabad'));
const ReelsVideoShootServicesGachibowli = React.lazy(() => import('./ReelsVideoShootServicesGachibowli'));
const ReelsVideoShootServicesSecunderabad = React.lazy(() => import('./ReelsVideoShootServicesSecunderabad'));
const ReelsVideoShootServicesKondapur = React.lazy(() => import('./ReelsVideoShootServicesKondapur'));
const ReelsVideoShootServicesJubileeHills = React.lazy(() => import('./ReelsVideoShootServicesJubileeHills'));
const ReelsVideoShootServicesMadhapur = React.lazy(() => import('./ReelsVideoShootServicesMadhapur'));
const ReelsVideoShootServicesBanjaraHills = React.lazy(() => import('./ReelsVideoShootServicesBanjaraHills'));
const ReelsVideoShootServicesKukatpally = React.lazy(() => import('./ReelsVideoShootServicesKukatpally'));
const BrandContentCreationPhotography = React.lazy(() => import('./BrandContentCreationPhotography'));
const BrandContentCreationPhotographyGachibowli = React.lazy(() => import('./BrandContentCreationPhotographyGachibowli'));
const BrandContentCreationPhotographySecunderabad = React.lazy(() => import('./BrandContentCreationPhotographySecunderabad'));
const BrandContentCreationPhotographyKondapur = React.lazy(() => import('./BrandContentCreationPhotographyKondapur'));
const BrandContentCreationPhotographyJubileeHills = React.lazy(() => import('./BrandContentCreationPhotographyJubileeHills'));
const BrandContentCreationPhotographyMadhapur = React.lazy(() => import('./BrandContentCreationPhotographyMadhapur'));
const BrandContentCreationPhotographyBanjaraHills = React.lazy(() => import('./BrandContentCreationPhotographyBanjaraHills'));
const BrandContentCreationPhotographyKukatpally = React.lazy(() => import('./BrandContentCreationPhotographyKukatpally'));
const BrandIdentityDesignServices = React.lazy(() => import('./BrandIdentityDesignServices'));
const BrandIdentityDesignServicesGachibowli = React.lazy(() => import('./BrandIdentityDesignServicesGachibowli'));
const BrandIdentityDesignServicesSecunderabad = React.lazy(() => import('./BrandIdentityDesignServicesSecunderabad'));
const BrandIdentityDesignServicesKondapur = React.lazy(() => import('./BrandIdentityDesignServicesKondapur'));
const BrandIdentityDesignServicesJubileeHills = React.lazy(() => import('./BrandIdentityDesignServicesJubileeHills'));
const BrandIdentityDesignServicesMadhapur = React.lazy(() => import('./BrandIdentityDesignServicesMadhapur'));
const BrandIdentityDesignServicesBanjaraHills = React.lazy(() => import('./BrandIdentityDesignServicesBanjaraHills'));
const BrandIdentityDesignServicesKukatpally = React.lazy(() => import('./BrandIdentityDesignServicesKukatpally'));
const BusinessWebsiteDevelopment = React.lazy(() => import('./BusinessWebsiteDevelopment'));
const BusinessWebsiteDevelopmentGachibowli = React.lazy(() => import('./BusinessWebsiteDevelopmentGachibowli'));
const BusinessWebsiteDevelopmentSecunderabad = React.lazy(() => import('./BusinessWebsiteDevelopmentSecunderabad'));
const BusinessWebsiteDevelopmentKondapur = React.lazy(() => import('./BusinessWebsiteDevelopmentKondapur'));
const BusinessWebsiteDevelopmentJubileeHills = React.lazy(() => import('./BusinessWebsiteDevelopmentJubileeHills'));
const BusinessWebsiteDevelopmentMadhapur = React.lazy(() => import('./BusinessWebsiteDevelopmentMadhapur'));
const BusinessWebsiteDevelopmentBanjaraHills = React.lazy(() => import('./BusinessWebsiteDevelopmentBanjaraHills'));
const BusinessWebsiteDevelopmentKukatpally = React.lazy(() => import('./BusinessWebsiteDevelopmentKukatpally'));
const GraphicDesignMarketingServices = React.lazy(() => import('./GraphicDesignMarketingServices'));
const GraphicDesignMarketingServicesGachibowli = React.lazy(() => import('./GraphicDesignMarketingServicesGachibowli'));
const GraphicDesignMarketingServicesSecunderabad = React.lazy(() => import('./GraphicDesignMarketingServicesSecunderabad'));
const GraphicDesignMarketingServicesKondapur = React.lazy(() => import('./GraphicDesignMarketingServicesKondapur'));
const GraphicDesignMarketingServicesJubileeHills = React.lazy(() => import('./GraphicDesignMarketingServicesJubileeHills'));
const GraphicDesignMarketingServicesMadhapur = React.lazy(() => import('./GraphicDesignMarketingServicesMadhapur'));
const GraphicDesignMarketingServicesBanjaraHills = React.lazy(() => import('./GraphicDesignMarketingServicesBanjaraHills'));
const GraphicDesignMarketingServicesKukatpally = React.lazy(() => import('./GraphicDesignMarketingServicesKukatpally'));
const ContentEditingServices = React.lazy(() => import('./ContentEditingServices'));
const ContentEditingServicesGachibowli = React.lazy(() => import('./ContentEditingServicesGachibowli'));
const ContentEditingServicesSecunderabad = React.lazy(() => import('./ContentEditingServicesSecunderabad'));
const ContentEditingServicesKondapur = React.lazy(() => import('./ContentEditingServicesKondapur'));
const ContentEditingServicesJubileeHills = React.lazy(() => import('./ContentEditingServicesJubileeHills'));
const ContentEditingServicesMadhapur = React.lazy(() => import('./ContentEditingServicesMadhapur'));
const ContentEditingServicesBanjaraHills = React.lazy(() => import('./ContentEditingServicesBanjaraHills'));
const ContentEditingServicesKukatpally = React.lazy(() => import('./ContentEditingServicesKukatpally'));
const FullMediaProductionServices = React.lazy(() => import('./FullMediaProductionServices'));
const FullMediaProductionServicesGachibowli = React.lazy(() => import('./FullMediaProductionServicesGachibowli'));
const FullMediaProductionServicesSecunderabad = React.lazy(() => import('./FullMediaProductionServicesSecunderabad'));
const FullMediaProductionServicesKondapur = React.lazy(() => import('./FullMediaProductionServicesKondapur'));
const FullMediaProductionServicesJubileeHills = React.lazy(() => import('./FullMediaProductionServicesJubileeHills'));
const FullMediaProductionServicesMadhapur = React.lazy(() => import('./FullMediaProductionServicesMadhapur'));
const FullMediaProductionServicesBanjaraHills = React.lazy(() => import('./FullMediaProductionServicesBanjaraHills'));
const FullMediaProductionServicesKukatpally = React.lazy(() => import('./FullMediaProductionServicesKukatpally'));
const EcommerceWebsiteDevelopment = React.lazy(() => import('./EcommerceWebsiteDevelopment'));
const EcommerceWebsiteDevelopmentGachibowli = React.lazy(() => import('./EcommerceWebsiteDevelopmentGachibowli'));
const EcommerceWebsiteDevelopmentSecunderabad = React.lazy(() => import('./EcommerceWebsiteDevelopmentSecunderabad'));
const EcommerceWebsiteDevelopmentKondapur = React.lazy(() => import('./EcommerceWebsiteDevelopmentKondapur'));
const EcommerceWebsiteDevelopmentJubileeHills = React.lazy(() => import('./EcommerceWebsiteDevelopmentJubileeHills'));
const EcommerceWebsiteDevelopmentMadhapur = React.lazy(() => import('./EcommerceWebsiteDevelopmentMadhapur'));
const EcommerceWebsiteDevelopmentBanjaraHills = React.lazy(() => import('./EcommerceWebsiteDevelopmentBanjaraHills'));
const EcommerceWebsiteDevelopmentKukatpally = React.lazy(() => import('./EcommerceWebsiteDevelopmentKukatpally'));
const BestMaternityPhotographersHyderabad = React.lazy(() => import('./BestMaternityPhotographersHyderabad'));
const BestMaternityPhotographersGachibowli = React.lazy(() => import('./BestMaternityPhotographersGachibowli'));
const BestMaternityPhotographersSecunderabad = React.lazy(() => import('./BestMaternityPhotographersSecunderabad'));
const BestMaternityPhotographersKondapur = React.lazy(() => import('./BestMaternityPhotographersKondapur'));
const BestMaternityPhotographersJubileeHills = React.lazy(() => import('./BestMaternityPhotographersJubileeHills'));
const BestMaternityPhotographersMadhapur = React.lazy(() => import('./BestMaternityPhotographersMadhapur'));
const BestMaternityPhotographersBanjaraHills = React.lazy(() => import('./BestMaternityPhotographersBanjaraHills'));
const BestMaternityPhotographersKukatpally = React.lazy(() => import('./BestMaternityPhotographersKukatpally'));
const FirstBirthdayPartyPhotographersHyderabad = React.lazy(() => import('./FirstBirthdayPartyPhotographersHyderabad'));
const FirstBirthdayPartyPhotographersGachibowli = React.lazy(() => import('./FirstBirthdayPartyPhotographersGachibowli'));
const FirstBirthdayPartyPhotographersSecunderabad = React.lazy(() => import('./FirstBirthdayPartyPhotographersSecunderabad'));
const FirstBirthdayPartyPhotographersKondapur = React.lazy(() => import('./FirstBirthdayPartyPhotographersKondapur'));
const FirstBirthdayPartyPhotographersJubileeHills = React.lazy(() => import('./FirstBirthdayPartyPhotographersJubileeHills'));
const FirstBirthdayPartyPhotographersMadhapur = React.lazy(() => import('./FirstBirthdayPartyPhotographersMadhapur'));
const FirstBirthdayPartyPhotographersBanjaraHills = React.lazy(() => import('./FirstBirthdayPartyPhotographersBanjaraHills'));
const FirstBirthdayPartyPhotographersKukatpally = React.lazy(() => import('./FirstBirthdayPartyPhotographersKukatpally'));
const NewbornBabyPhotographyServicesHyderabad = React.lazy(() => import('./NewbornBabyPhotographyServicesHyderabad'));
const NewbornBabyPhotographyServicesGachibowli = React.lazy(() => import('./NewbornBabyPhotographyServicesGachibowli'));
const NewbornBabyPhotographyServicesSecunderabad = React.lazy(() => import('./NewbornBabyPhotographyServicesSecunderabad'));
const NewbornBabyPhotographyServicesKondapur = React.lazy(() => import('./NewbornBabyPhotographyServicesKondapur'));
const NewbornBabyPhotographyServicesJubileeHills = React.lazy(() => import('./NewbornBabyPhotographyServicesJubileeHills'));
const NewbornBabyPhotographyServicesMadhapur = React.lazy(() => import('./NewbornBabyPhotographyServicesMadhapur'));
const NewbornBabyPhotographyServicesBanjaraHills = React.lazy(() => import('./NewbornBabyPhotographyServicesBanjaraHills'));
const NewbornBabyPhotographyServicesKukatpally = React.lazy(() => import('./NewbornBabyPhotographyServicesKukatpally'));
const MehndiHaldiFunctionPhotographersHyderabad = React.lazy(() => import('./MehndiHaldiFunctionPhotographersHyderabad'));
const MehndiHaldiFunctionPhotographersGachibowli = React.lazy(() => import('./MehndiHaldiFunctionPhotographersGachibowli'));
const MehndiHaldiFunctionPhotographersSecunderabad = React.lazy(() => import('./MehndiHaldiFunctionPhotographersSecunderabad'));
const MehndiHaldiFunctionPhotographersKondapur = React.lazy(() => import('./MehndiHaldiFunctionPhotographersKondapur'));
const MehndiHaldiFunctionPhotographersJubileeHills = React.lazy(() => import('./MehndiHaldiFunctionPhotographersJubileeHills'));
const MehndiHaldiFunctionPhotographersMadhapur = React.lazy(() => import('./MehndiHaldiFunctionPhotographersMadhapur'));
const MehndiHaldiFunctionPhotographersBanjaraHills = React.lazy(() => import('./MehndiHaldiFunctionPhotographersBanjaraHills'));
const MehndiHaldiFunctionPhotographersKukatpally = React.lazy(() => import('./MehndiHaldiFunctionPhotographersKukatpally'));
const HalfSareeCeremonyPhotographersHyderabad = React.lazy(() => import('./HalfSareeCeremonyPhotographersHyderabad'));
const HalfSareeCeremonyPhotographersGachibowli = React.lazy(() => import('./HalfSareeCeremonyPhotographersGachibowli'));
const HalfSareeCeremonyPhotographersSecunderabad = React.lazy(() => import('./HalfSareeCeremonyPhotographersSecunderabad'));
const HalfSareeCeremonyPhotographersKondapur = React.lazy(() => import('./HalfSareeCeremonyPhotographersKondapur'));
const HalfSareeCeremonyPhotographersJubileeHills = React.lazy(() => import('./HalfSareeCeremonyPhotographersJubileeHills'));
const HalfSareeCeremonyPhotographersMadhapur = React.lazy(() => import('./HalfSareeCeremonyPhotographersMadhapur'));
const HalfSareeCeremonyPhotographersBanjaraHills = React.lazy(() => import('./HalfSareeCeremonyPhotographersBanjaraHills'));
const HalfSareeCeremonyPhotographersKukatpally = React.lazy(() => import('./HalfSareeCeremonyPhotographersKukatpally'));
const BirthdayPartyPhotographersHyderabad = React.lazy(() => import('./BirthdayPartyPhotographersHyderabad'));
const BirthdayPartyPhotographersGachibowli = React.lazy(() => import('./BirthdayPartyPhotographersGachibowli'));
const BirthdayPartyPhotographersSecunderabad = React.lazy(() => import('./BirthdayPartyPhotographersSecunderabad'));
const BirthdayPartyPhotographersKondapur = React.lazy(() => import('./BirthdayPartyPhotographersKondapur'));
const BirthdayPartyPhotographersJubileeHills = React.lazy(() => import('./BirthdayPartyPhotographersJubileeHills'));
const BirthdayPartyPhotographersMadhapur = React.lazy(() => import('./BirthdayPartyPhotographersMadhapur'));
const BirthdayPartyPhotographersBanjaraHills = React.lazy(() => import('./BirthdayPartyPhotographersBanjaraHills'));
const BirthdayPartyPhotographersKukatpally = React.lazy(() => import('./BirthdayPartyPhotographersKukatpally'));
const EventPlannersHyderabad = React.lazy(() => import('./EventPlannersHyderabad'));
const EventPlannersGachibowli = React.lazy(() => import('./EventPlannersGachibowli'));
const EventPlannersSecunderabad = React.lazy(() => import('./EventPlannersSecunderabad'));
const EventPlannersKondapur = React.lazy(() => import('./EventPlannersKondapur'));
const EventPlannersJubileeHills = React.lazy(() => import('./EventPlannersJubileeHills'));
const EventPlannersMadhapur = React.lazy(() => import('./EventPlannersMadhapur'));
const EventPlannersBanjaraHills = React.lazy(() => import('./EventPlannersBanjaraHills'));
const EventPlannersKukatpally = React.lazy(() => import('./EventPlannersKukatpally'));
const FamilyPortraitPhotographersHyderabadTelangana = React.lazy(() => import('./FamilyPortraitPhotographersHyderabadTelangana'));
const FamilyPortraitPhotographersGachibowli = React.lazy(() => import('./FamilyPortraitPhotographersGachibowli'));
const FamilyPortraitPhotographersSecunderabad = React.lazy(() => import('./FamilyPortraitPhotographersSecunderabad'));
const FamilyPortraitPhotographersKondapur = React.lazy(() => import('./FamilyPortraitPhotographersKondapur'));
const FamilyPortraitPhotographersJubileeHills = React.lazy(() => import('./FamilyPortraitPhotographersJubileeHills'));
const FamilyPortraitPhotographersMadhapur = React.lazy(() => import('./FamilyPortraitPhotographersMadhapur'));
const FamilyPortraitPhotographersBanjaraHills = React.lazy(() => import('./FamilyPortraitPhotographersBanjaraHills'));
const FamilyPortraitPhotographersKukatpally = React.lazy(() => import('./FamilyPortraitPhotographersKukatpally'));
const GraduationPortraitPhotographersHyderabad = React.lazy(() => import('./GraduationPortraitPhotographersHyderabad'));
const GraduationPortraitPhotographersGachibowli = React.lazy(() => import('./GraduationPortraitPhotographersGachibowli'));
const GraduationPortraitPhotographersSecunderabad = React.lazy(() => import('./GraduationPortraitPhotographersSecunderabad'));
const GraduationPortraitPhotographersKondapur = React.lazy(() => import('./GraduationPortraitPhotographersKondapur'));
const GraduationPortraitPhotographersJubileeHills = React.lazy(() => import('./GraduationPortraitPhotographersJubileeHills'));
const GraduationPortraitPhotographersMadhapur = React.lazy(() => import('./GraduationPortraitPhotographersMadhapur'));
const GraduationPortraitPhotographersBanjaraHills = React.lazy(() => import('./GraduationPortraitPhotographersBanjaraHills'));
const GraduationPortraitPhotographersKukatpally = React.lazy(() => import('./GraduationPortraitPhotographersKukatpally'));
const KidsChildrenPhotographersHyderabad = React.lazy(() => import('./KidsChildrenPhotographersHyderabad'));
const KidsChildrenPhotographersGachibowli = React.lazy(() => import('./KidsChildrenPhotographersGachibowli'));
const KidsChildrenPhotographersSecunderabad = React.lazy(() => import('./KidsChildrenPhotographersSecunderabad'));
const KidsChildrenPhotographersKondapur = React.lazy(() => import('./KidsChildrenPhotographersKondapur'));
const KidsChildrenPhotographersJubileeHills = React.lazy(() => import('./KidsChildrenPhotographersJubileeHills'));
const KidsChildrenPhotographersMadhapur = React.lazy(() => import('./KidsChildrenPhotographersMadhapur'));
const KidsChildrenPhotographersBanjaraHills = React.lazy(() => import('./KidsChildrenPhotographersBanjaraHills'));
const KidsChildrenPhotographersKukatpally = React.lazy(() => import('./KidsChildrenPhotographersKukatpally'));
const CinematicThemedPhotoshootsHyderabad = React.lazy(() => import('./CinematicThemedPhotoshootsHyderabad'));
const CinematicThemedPhotoshootsGachibowli = React.lazy(() => import('./CinematicThemedPhotoshootsGachibowli'));
const CinematicThemedPhotoshootsSecunderabad = React.lazy(() => import('./CinematicThemedPhotoshootsSecunderabad'));
const CinematicThemedPhotoshootsKondapur = React.lazy(() => import('./CinematicThemedPhotoshootsKondapur'));
const CinematicThemedPhotoshootsJubileeHills = React.lazy(() => import('./CinematicThemedPhotoshootsJubileeHills'));
const CinematicThemedPhotoshootsMadhapur = React.lazy(() => import('./CinematicThemedPhotoshootsMadhapur'));
const CinematicThemedPhotoshootsBanjaraHills = React.lazy(() => import('./CinematicThemedPhotoshootsBanjaraHills'));
const CinematicThemedPhotoshootsKukatpally = React.lazy(() => import('./CinematicThemedPhotoshootsKukatpally'));
const AnniversaryPartyPhotographersHyderabad = React.lazy(() => import('./AnniversaryPartyPhotographersHyderabad'));
const AnniversaryPartyPhotographersGachibowli = React.lazy(() => import('./AnniversaryPartyPhotographersGachibowli'));
const AnniversaryPartyPhotographersSecunderabad = React.lazy(() => import('./AnniversaryPartyPhotographersSecunderabad'));
const AnniversaryPartyPhotographersKondapur = React.lazy(() => import('./AnniversaryPartyPhotographersKondapur'));
const AnniversaryPartyPhotographersJubileeHills = React.lazy(() => import('./AnniversaryPartyPhotographersJubileeHills'));
const AnniversaryPartyPhotographersMadhapur = React.lazy(() => import('./AnniversaryPartyPhotographersMadhapur'));
const AnniversaryPartyPhotographersBanjaraHills = React.lazy(() => import('./AnniversaryPartyPhotographersBanjaraHills'));
const AnniversaryPartyPhotographersKukatpally = React.lazy(() => import('./AnniversaryPartyPhotographersKukatpally'));
const ProfessionalPetPhotographersHyderabad = React.lazy(() => import('./ProfessionalPetPhotographersHyderabad'));
const ProfessionalPetPhotographersGachibowli = React.lazy(() => import('./ProfessionalPetPhotographersGachibowli'));
const ProfessionalPetPhotographersSecunderabad = React.lazy(() => import('./ProfessionalPetPhotographersSecunderabad'));
const ProfessionalPetPhotographersKondapur = React.lazy(() => import('./ProfessionalPetPhotographersKondapur'));
const ProfessionalPetPhotographersJubileeHills = React.lazy(() => import('./ProfessionalPetPhotographersJubileeHills'));
const ProfessionalPetPhotographersMadhapur = React.lazy(() => import('./ProfessionalPetPhotographersMadhapur'));
const ProfessionalPetPhotographersBanjaraHills = React.lazy(() => import('./ProfessionalPetPhotographersBanjaraHills'));
const ProfessionalPetPhotographersKukatpally = React.lazy(() => import('./ProfessionalPetPhotographersKukatpally'));
const FitnessSportsPhotographersHyderabad = React.lazy(() => import('./FitnessSportsPhotographersHyderabad'));
const FitnessSportsPhotographersGachibowli = React.lazy(() => import('./FitnessSportsPhotographersGachibowli'));
const FitnessSportsPhotographersSecunderabad = React.lazy(() => import('./FitnessSportsPhotographersSecunderabad'));
const FitnessSportsPhotographersKondapur = React.lazy(() => import('./FitnessSportsPhotographersKondapur'));
const FitnessSportsPhotographersJubileeHills = React.lazy(() => import('./FitnessSportsPhotographersJubileeHills'));
const FitnessSportsPhotographersMadhapur = React.lazy(() => import('./FitnessSportsPhotographersMadhapur'));
const FitnessSportsPhotographersBanjaraHills = React.lazy(() => import('./FitnessSportsPhotographersBanjaraHills'));
const FitnessSportsPhotographersKukatpally = React.lazy(() => import('./FitnessSportsPhotographersKukatpally'));
const CorporateBusinessPhotographyHyderabad = React.lazy(() => import('./CorporateBusinessPhotographyHyderabad'));
const CorporateBusinessPhotographyGachibowli = React.lazy(() => import('./CorporateBusinessPhotographyGachibowli'));
const CorporateBusinessPhotographySecunderabad = React.lazy(() => import('./CorporateBusinessPhotographySecunderabad'));
const CorporateBusinessPhotographyKondapur = React.lazy(() => import('./CorporateBusinessPhotographyKondapur'));
const CorporateBusinessPhotographyJubileeHills = React.lazy(() => import('./CorporateBusinessPhotographyJubileeHills'));
const CorporateBusinessPhotographyMadhapur = React.lazy(() => import('./CorporateBusinessPhotographyMadhapur'));
const CorporateBusinessPhotographyBanjaraHills = React.lazy(() => import('./CorporateBusinessPhotographyBanjaraHills'));
const CorporateBusinessPhotographyKukatpally = React.lazy(() => import('./CorporateBusinessPhotographyKukatpally'));
const PreWeddingCouplePhotoshootsHyderabad = React.lazy(() => import('./PreWeddingCouplePhotoshootsHyderabad'));
const PreWeddingCouplePhotoshootsGachibowli = React.lazy(() => import('./PreWeddingCouplePhotoshootsGachibowli'));
const PreWeddingCouplePhotoshootsSecunderabad = React.lazy(() => import('./PreWeddingCouplePhotoshootsSecunderabad'));
const PreWeddingCouplePhotoshootsKondapur = React.lazy(() => import('./PreWeddingCouplePhotoshootsKondapur'));
const PreWeddingCouplePhotoshootsJubileeHills = React.lazy(() => import('./PreWeddingCouplePhotoshootsJubileeHills'));
const PreWeddingCouplePhotoshootsMadhapur = React.lazy(() => import('./PreWeddingCouplePhotoshootsMadhapur'));
const PreWeddingCouplePhotoshootsBanjaraHills = React.lazy(() => import('./PreWeddingCouplePhotoshootsBanjaraHills'));
const PreWeddingCouplePhotoshootsKukatpally = React.lazy(() => import('./PreWeddingCouplePhotoshootsKukatpally'));
const CommercialProductPhotographersHyderabad = React.lazy(() => import('./CommercialProductPhotographersHyderabad'));
const CommercialProductPhotographersGachibowli = React.lazy(() => import('./CommercialProductPhotographersGachibowli'));
const CommercialProductPhotographersSecunderabad = React.lazy(() => import('./CommercialProductPhotographersSecunderabad'));
const CommercialProductPhotographersKondapur = React.lazy(() => import('./CommercialProductPhotographersKondapur'));
const CommercialProductPhotographersJubileeHills = React.lazy(() => import('./CommercialProductPhotographersJubileeHills'));
const CommercialProductPhotographersMadhapur = React.lazy(() => import('./CommercialProductPhotographersMadhapur'));
const CommercialProductPhotographersBanjaraHills = React.lazy(() => import('./CommercialProductPhotographersBanjaraHills'));
const CommercialProductPhotographersKukatpally = React.lazy(() => import('./CommercialProductPhotographersKukatpally'));
const BabyMilestoneVideoProductionHyderabad = React.lazy(() => import('./BabyMilestoneVideoProductionHyderabad'));
const BabyMilestoneVideoProductionGachibowli = React.lazy(() => import('./BabyMilestoneVideoProductionGachibowli'));
const BabyMilestoneVideoProductionSecunderabad = React.lazy(() => import('./BabyMilestoneVideoProductionSecunderabad'));
const BabyMilestoneVideoProductionKondapur = React.lazy(() => import('./BabyMilestoneVideoProductionKondapur'));
const BabyMilestoneVideoProductionJubileeHills = React.lazy(() => import('./BabyMilestoneVideoProductionJubileeHills'));
const BabyMilestoneVideoProductionMadhapur = React.lazy(() => import('./BabyMilestoneVideoProductionMadhapur'));
const BabyMilestoneVideoProductionBanjaraHills = React.lazy(() => import('./BabyMilestoneVideoProductionBanjaraHills'));
const BabyMilestoneVideoProductionKukatpally = React.lazy(() => import('./BabyMilestoneVideoProductionKukatpally'));
const BirthdayEventVideographersHyderabad = React.lazy(() => import('./BirthdayEventVideographersHyderabad'));
const BirthdayEventVideographersGachibowli = React.lazy(() => import('./BirthdayEventVideographersGachibowli'));
const BirthdayEventVideographersSecunderabad = React.lazy(() => import('./BirthdayEventVideographersSecunderabad'));
const BirthdayEventVideographersKondapur = React.lazy(() => import('./BirthdayEventVideographersKondapur'));
const BirthdayEventVideographersJubileeHills = React.lazy(() => import('./BirthdayEventVideographersJubileeHills'));
const BirthdayEventVideographersMadhapur = React.lazy(() => import('./BirthdayEventVideographersMadhapur'));
const BirthdayEventVideographersBanjaraHills = React.lazy(() => import('./BirthdayEventVideographersBanjaraHills'));
const BirthdayEventVideographersKukatpally = React.lazy(() => import('./BirthdayEventVideographersKukatpally'));
const CorporateBrandStoryVideoProduction = React.lazy(() => import('./CorporateBrandStoryVideoProduction'));
const CorporateBrandStoryVideoProductionGachibowli = React.lazy(() => import('./CorporateBrandStoryVideoProductionGachibowli'));
const CorporateBrandStoryVideoProductionSecunderabad = React.lazy(() => import('./CorporateBrandStoryVideoProductionSecunderabad'));
const CorporateBrandStoryVideoProductionKondapur = React.lazy(() => import('./CorporateBrandStoryVideoProductionKondapur'));
const CorporateBrandStoryVideoProductionJubileeHills = React.lazy(() => import('./CorporateBrandStoryVideoProductionJubileeHills'));
const CorporateBrandStoryVideoProductionMadhapur = React.lazy(() => import('./CorporateBrandStoryVideoProductionMadhapur'));
const CorporateBrandStoryVideoProductionBanjaraHills = React.lazy(() => import('./CorporateBrandStoryVideoProductionBanjaraHills'));
const CorporateBrandStoryVideoProductionKukatpally = React.lazy(() => import('./CorporateBrandStoryVideoProductionKukatpally'));
const FitnessGymPromoVideosHyderabad = React.lazy(() => import('./FitnessGymPromoVideosHyderabad'));
const FitnessGymPromoVideosGachibowli = React.lazy(() => import('./FitnessGymPromoVideosGachibowli'));
const FitnessGymPromoVideosSecunderabad = React.lazy(() => import('./FitnessGymPromoVideosSecunderabad'));
const FitnessGymPromoVideosKondapur = React.lazy(() => import('./FitnessGymPromoVideosKondapur'));
const FitnessGymPromoVideosJubileeHills = React.lazy(() => import('./FitnessGymPromoVideosJubileeHills'));
const FitnessGymPromoVideosMadhapur = React.lazy(() => import('./FitnessGymPromoVideosMadhapur'));
const FitnessGymPromoVideosBanjaraHills = React.lazy(() => import('./FitnessGymPromoVideosBanjaraHills'));
const FitnessGymPromoVideosKukatpally = React.lazy(() => import('./FitnessGymPromoVideosKukatpally'));
const InterviewTalkingHeadVideoServices = React.lazy(() => import('./InterviewTalkingHeadVideoServices'));
const InterviewTalkingHeadVideoServicesGachibowli = React.lazy(() => import('./InterviewTalkingHeadVideoServicesGachibowli'));
const InterviewTalkingHeadVideoServicesSecunderabad = React.lazy(() => import('./InterviewTalkingHeadVideoServicesSecunderabad'));
const InterviewTalkingHeadVideoServicesKondapur = React.lazy(() => import('./InterviewTalkingHeadVideoServicesKondapur'));
const InterviewTalkingHeadVideoServicesJubileeHills = React.lazy(() => import('./InterviewTalkingHeadVideoServicesJubileeHills'));
const InterviewTalkingHeadVideoServicesMadhapur = React.lazy(() => import('./InterviewTalkingHeadVideoServicesMadhapur'));
const InterviewTalkingHeadVideoServicesBanjaraHills = React.lazy(() => import('./InterviewTalkingHeadVideoServicesBanjaraHills'));
const InterviewTalkingHeadVideoServicesKukatpally = React.lazy(() => import('./InterviewTalkingHeadVideoServicesKukatpally'));
const RestaurantFoodPromotionalVideosHyderabad = React.lazy(() => import('./RestaurantFoodPromotionalVideosHyderabad'));
const RestaurantFoodPromotionalVideosGachibowli = React.lazy(() => import('./RestaurantFoodPromotionalVideosGachibowli'));
const RestaurantFoodPromotionalVideosSecunderabad = React.lazy(() => import('./RestaurantFoodPromotionalVideosSecunderabad'));
const RestaurantFoodPromotionalVideosKondapur = React.lazy(() => import('./RestaurantFoodPromotionalVideosKondapur'));
const RestaurantFoodPromotionalVideosJubileeHills = React.lazy(() => import('./RestaurantFoodPromotionalVideosJubileeHills'));
const RestaurantFoodPromotionalVideosMadhapur = React.lazy(() => import('./RestaurantFoodPromotionalVideosMadhapur'));
const RestaurantFoodPromotionalVideosBanjaraHills = React.lazy(() => import('./RestaurantFoodPromotionalVideosBanjaraHills'));
const RestaurantFoodPromotionalVideosKukatpally = React.lazy(() => import('./RestaurantFoodPromotionalVideosKukatpally'));
const EcommerceShopifyStoreSetup = React.lazy(() => import('./EcommerceShopifyStoreSetup'));
const EcommerceShopifyStoreSetupGachibowli = React.lazy(() => import('./EcommerceShopifyStoreSetupGachibowli'));
const EcommerceShopifyStoreSetupSecunderabad = React.lazy(() => import('./EcommerceShopifyStoreSetupSecunderabad'));
const EcommerceShopifyStoreSetupKondapur = React.lazy(() => import('./EcommerceShopifyStoreSetupKondapur'));
const EcommerceShopifyStoreSetupJubileeHills = React.lazy(() => import('./EcommerceShopifyStoreSetupJubileeHills'));
const EcommerceShopifyStoreSetupMadhapur = React.lazy(() => import('./EcommerceShopifyStoreSetupMadhapur'));
const EcommerceShopifyStoreSetupBanjaraHills = React.lazy(() => import('./EcommerceShopifyStoreSetupBanjaraHills'));
const EcommerceShopifyStoreSetupKukatpally = React.lazy(() => import('./EcommerceShopifyStoreSetupKukatpally'));
const MusicVideoSongReelProduction = React.lazy(() => import('./MusicVideoSongReelProduction'));
const MusicVideoSongReelProductionGachibowli = React.lazy(() => import('./MusicVideoSongReelProductionGachibowli'));
const MusicVideoSongReelProductionSecunderabad = React.lazy(() => import('./MusicVideoSongReelProductionSecunderabad'));
const MusicVideoSongReelProductionKondapur = React.lazy(() => import('./MusicVideoSongReelProductionKondapur'));
const MusicVideoSongReelProductionJubileeHills = React.lazy(() => import('./MusicVideoSongReelProductionJubileeHills'));
const MusicVideoSongReelProductionMadhapur = React.lazy(() => import('./MusicVideoSongReelProductionMadhapur'));
const MusicVideoSongReelProductionBanjaraHills = React.lazy(() => import('./MusicVideoSongReelProductionBanjaraHills'));
const MusicVideoSongReelProductionKukatpally = React.lazy(() => import('./MusicVideoSongReelProductionKukatpally'));
const ProfessionalCreativeServicesAgency = React.lazy(() => import('./ProfessionalCreativeServicesAgency'));
const ProfessionalCreativeServicesAgencyGachibowli = React.lazy(() => import('./ProfessionalCreativeServicesAgencyGachibowli'));
const ProfessionalCreativeServicesAgencySecunderabad = React.lazy(() => import('./ProfessionalCreativeServicesAgencySecunderabad'));
const ProfessionalCreativeServicesAgencyKondapur = React.lazy(() => import('./ProfessionalCreativeServicesAgencyKondapur'));
const ProfessionalCreativeServicesAgencyJubileeHills = React.lazy(() => import('./ProfessionalCreativeServicesAgencyJubileeHills'));
const ProfessionalCreativeServicesAgencyMadhapur = React.lazy(() => import('./ProfessionalCreativeServicesAgencyMadhapur'));
const ProfessionalCreativeServicesAgencyBanjaraHills = React.lazy(() => import('./ProfessionalCreativeServicesAgencyBanjaraHills'));
const ProfessionalCreativeServicesAgencyKukatpally = React.lazy(() => import('./ProfessionalCreativeServicesAgencyKukatpally'));
const CorporatePromoVideoProduction = React.lazy(() => import('./CorporatePromoVideoProduction'));
const CorporatePromoVideoProductionGachibowli = React.lazy(() => import('./CorporatePromoVideoProductionGachibowli'));
const CorporatePromoVideoProductionSecunderabad = React.lazy(() => import('./CorporatePromoVideoProductionSecunderabad'));
const CorporatePromoVideoProductionKondapur = React.lazy(() => import('./CorporatePromoVideoProductionKondapur'));
const CorporatePromoVideoProductionJubileeHills = React.lazy(() => import('./CorporatePromoVideoProductionJubileeHills'));
const CorporatePromoVideoProductionMadhapur = React.lazy(() => import('./CorporatePromoVideoProductionMadhapur'));
const CorporatePromoVideoProductionBanjaraHills = React.lazy(() => import('./CorporatePromoVideoProductionBanjaraHills'));
const CorporatePromoVideoProductionKukatpally = React.lazy(() => import('./CorporatePromoVideoProductionKukatpally'));
const DatabaseSetupAndOptimizationServices = React.lazy(() => import('./DatabaseSetupAndOptimizationServices'));
const DatabaseSetupAndOptimizationServicesGachibowli = React.lazy(() => import('./DatabaseSetupAndOptimizationServicesGachibowli'));
const DatabaseSetupAndOptimizationServicesSecunderabad = React.lazy(() => import('./DatabaseSetupAndOptimizationServicesSecunderabad'));
const DatabaseSetupAndOptimizationServicesKondapur = React.lazy(() => import('./DatabaseSetupAndOptimizationServicesKondapur'));
const DatabaseSetupAndOptimizationServicesJubileeHills = React.lazy(() => import('./DatabaseSetupAndOptimizationServicesJubileeHills'));
const DatabaseSetupAndOptimizationServicesMadhapur = React.lazy(() => import('./DatabaseSetupAndOptimizationServicesMadhapur'));
const DatabaseSetupAndOptimizationServicesBanjaraHills = React.lazy(() => import('./DatabaseSetupAndOptimizationServicesBanjaraHills'));
const DatabaseSetupAndOptimizationServicesKukatpally = React.lazy(() => import('./DatabaseSetupAndOptimizationServicesKukatpally'));
const LandingPagePortfolioWebsiteDesign = React.lazy(() => import('./LandingPagePortfolioWebsiteDesign'));
const LandingPagePortfolioWebsiteDesignGachibowli = React.lazy(() => import('./LandingPagePortfolioWebsiteDesignGachibowli'));
const LandingPagePortfolioWebsiteDesignSecunderabad = React.lazy(() => import('./LandingPagePortfolioWebsiteDesignSecunderabad'));
const LandingPagePortfolioWebsiteDesignKondapur = React.lazy(() => import('./LandingPagePortfolioWebsiteDesignKondapur'));
const LandingPagePortfolioWebsiteDesignJubileeHills = React.lazy(() => import('./LandingPagePortfolioWebsiteDesignJubileeHills'));
const LandingPagePortfolioWebsiteDesignMadhapur = React.lazy(() => import('./LandingPagePortfolioWebsiteDesignMadhapur'));
const LandingPagePortfolioWebsiteDesignBanjaraHills = React.lazy(() => import('./LandingPagePortfolioWebsiteDesignBanjaraHills'));
const LandingPagePortfolioWebsiteDesignKukatpally = React.lazy(() => import('./LandingPagePortfolioWebsiteDesignKukatpally'));
const UiUxDesignPrototypingServices = React.lazy(() => import('./UiUxDesignPrototypingServices'));
const UiUxDesignPrototypingServicesGachibowli = React.lazy(() => import('./UiUxDesignPrototypingServicesGachibowli'));
const UiUxDesignPrototypingServicesSecunderabad = React.lazy(() => import('./UiUxDesignPrototypingServicesSecunderabad'));
const UiUxDesignPrototypingServicesKondapur = React.lazy(() => import('./UiUxDesignPrototypingServicesKondapur'));
const UiUxDesignPrototypingServicesJubileeHills = React.lazy(() => import('./UiUxDesignPrototypingServicesJubileeHills'));
const UiUxDesignPrototypingServicesMadhapur = React.lazy(() => import('./UiUxDesignPrototypingServicesMadhapur'));
const UiUxDesignPrototypingServicesBanjaraHills = React.lazy(() => import('./UiUxDesignPrototypingServicesBanjaraHills'));
const UiUxDesignPrototypingServicesKukatpally = React.lazy(() => import('./UiUxDesignPrototypingServicesKukatpally'));
const CustomWebsiteDevelopmentServices = React.lazy(() => import('./CustomWebsiteDevelopmentServices'));
const CustomWebsiteDevelopmentServicesGachibowli = React.lazy(() => import('./CustomWebsiteDevelopmentServicesGachibowli'));
const CustomWebsiteDevelopmentServicesSecunderabad = React.lazy(() => import('./CustomWebsiteDevelopmentServicesSecunderabad'));
const CustomWebsiteDevelopmentServicesKondapur = React.lazy(() => import('./CustomWebsiteDevelopmentServicesKondapur'));
const CustomWebsiteDevelopmentServicesJubileeHills = React.lazy(() => import('./CustomWebsiteDevelopmentServicesJubileeHills'));
const CustomWebsiteDevelopmentServicesMadhapur = React.lazy(() => import('./CustomWebsiteDevelopmentServicesMadhapur'));
const CustomWebsiteDevelopmentServicesBanjaraHills = React.lazy(() => import('./CustomWebsiteDevelopmentServicesBanjaraHills'));
const CustomWebsiteDevelopmentServicesKukatpally = React.lazy(() => import('./CustomWebsiteDevelopmentServicesKukatpally'));
const YoutubeShortsVideoEditors = React.lazy(() => import('./YoutubeShortsVideoEditors'));
const YoutubeShortsVideoEditorsGachibowli = React.lazy(() => import('./YoutubeShortsVideoEditorsGachibowli'));
const YoutubeShortsVideoEditorsSecunderabad = React.lazy(() => import('./YoutubeShortsVideoEditorsSecunderabad'));
const YoutubeShortsVideoEditorsKondapur = React.lazy(() => import('./YoutubeShortsVideoEditorsKondapur'));
const YoutubeShortsVideoEditorsJubileeHills = React.lazy(() => import('./YoutubeShortsVideoEditorsJubileeHills'));
const YoutubeShortsVideoEditorsMadhapur = React.lazy(() => import('./YoutubeShortsVideoEditorsMadhapur'));
const YoutubeShortsVideoEditorsBanjaraHills = React.lazy(() => import('./YoutubeShortsVideoEditorsBanjaraHills'));
const YoutubeShortsVideoEditorsKukatpally = React.lazy(() => import('./YoutubeShortsVideoEditorsKukatpally'));
const BusinessPromoReelsCreation = React.lazy(() => import('./BusinessPromoReelsCreation'));
const BusinessPromoReelsCreationGachibowli = React.lazy(() => import('./BusinessPromoReelsCreationGachibowli'));
const BusinessPromoReelsCreationSecunderabad = React.lazy(() => import('./BusinessPromoReelsCreationSecunderabad'));
const BusinessPromoReelsCreationKondapur = React.lazy(() => import('./BusinessPromoReelsCreationKondapur'));
const BusinessPromoReelsCreationJubileeHills = React.lazy(() => import('./BusinessPromoReelsCreationJubileeHills'));
const BusinessPromoReelsCreationMadhapur = React.lazy(() => import('./BusinessPromoReelsCreationMadhapur'));
const BusinessPromoReelsCreationBanjaraHills = React.lazy(() => import('./BusinessPromoReelsCreationBanjaraHills'));
const BusinessPromoReelsCreationKukatpally = React.lazy(() => import('./BusinessPromoReelsCreationKukatpally'));
const FitnessTransformationReelsEditing = React.lazy(() => import('./FitnessTransformationReelsEditing'));
const FitnessTransformationReelsEditingGachibowli = React.lazy(() => import('./FitnessTransformationReelsEditingGachibowli'));
const FitnessTransformationReelsEditingSecunderabad = React.lazy(() => import('./FitnessTransformationReelsEditingSecunderabad'));
const FitnessTransformationReelsEditingKondapur = React.lazy(() => import('./FitnessTransformationReelsEditingKondapur'));
const FitnessTransformationReelsEditingJubileeHills = React.lazy(() => import('./FitnessTransformationReelsEditingJubileeHills'));
const FitnessTransformationReelsEditingMadhapur = React.lazy(() => import('./FitnessTransformationReelsEditingMadhapur'));
const FitnessTransformationReelsEditingBanjaraHills = React.lazy(() => import('./FitnessTransformationReelsEditingBanjaraHills'));
const FitnessTransformationReelsEditingKukatpally = React.lazy(() => import('./FitnessTransformationReelsEditingKukatpally'));
const InstagramFeedReelsVideoEditing = React.lazy(() => import('./InstagramFeedReelsVideoEditing'));
const InstagramFeedReelsVideoEditingGachibowli = React.lazy(() => import('./InstagramFeedReelsVideoEditingGachibowli'));
const InstagramFeedReelsVideoEditingSecunderabad = React.lazy(() => import('./InstagramFeedReelsVideoEditingSecunderabad'));
const InstagramFeedReelsVideoEditingKondapur = React.lazy(() => import('./InstagramFeedReelsVideoEditingKondapur'));
const InstagramFeedReelsVideoEditingJubileeHills = React.lazy(() => import('./InstagramFeedReelsVideoEditingJubileeHills'));
const InstagramFeedReelsVideoEditingMadhapur = React.lazy(() => import('./InstagramFeedReelsVideoEditingMadhapur'));
const InstagramFeedReelsVideoEditingBanjaraHills = React.lazy(() => import('./InstagramFeedReelsVideoEditingBanjaraHills'));
const InstagramFeedReelsVideoEditingKukatpally = React.lazy(() => import('./InstagramFeedReelsVideoEditingKukatpally'));
const PersonalPortfolioReelsCreation = React.lazy(() => import('./PersonalPortfolioReelsCreation'));
const PersonalPortfolioReelsCreationGachibowli = React.lazy(() => import('./PersonalPortfolioReelsCreationGachibowli'));
const PersonalPortfolioReelsCreationSecunderabad = React.lazy(() => import('./PersonalPortfolioReelsCreationSecunderabad'));
const PersonalPortfolioReelsCreationKondapur = React.lazy(() => import('./PersonalPortfolioReelsCreationKondapur'));
const PersonalPortfolioReelsCreationJubileeHills = React.lazy(() => import('./PersonalPortfolioReelsCreationJubileeHills'));
const PersonalPortfolioReelsCreationMadhapur = React.lazy(() => import('./PersonalPortfolioReelsCreationMadhapur'));
const PersonalPortfolioReelsCreationBanjaraHills = React.lazy(() => import('./PersonalPortfolioReelsCreationBanjaraHills'));
const PersonalPortfolioReelsCreationKukatpally = React.lazy(() => import('./PersonalPortfolioReelsCreationKukatpally'));
const PodcastInterviewClipsEditing = React.lazy(() => import('./PodcastInterviewClipsEditing'));
const PodcastInterviewClipsEditingGachibowli = React.lazy(() => import('./PodcastInterviewClipsEditingGachibowli'));
const PodcastInterviewClipsEditingSecunderabad = React.lazy(() => import('./PodcastInterviewClipsEditingSecunderabad'));
const PodcastInterviewClipsEditingKondapur = React.lazy(() => import('./PodcastInterviewClipsEditingKondapur'));
const PodcastInterviewClipsEditingJubileeHills = React.lazy(() => import('./PodcastInterviewClipsEditingJubileeHills'));
const PodcastInterviewClipsEditingMadhapur = React.lazy(() => import('./PodcastInterviewClipsEditingMadhapur'));
const PodcastInterviewClipsEditingBanjaraHills = React.lazy(() => import('./PodcastInterviewClipsEditingBanjaraHills'));
const PodcastInterviewClipsEditingKukatpally = React.lazy(() => import('./PodcastInterviewClipsEditingKukatpally'));
const ProductBrandReelsProduction = React.lazy(() => import('./ProductBrandReelsProduction'));
const ProductBrandReelsProductionGachibowli = React.lazy(() => import('./ProductBrandReelsProductionGachibowli'));
const ProductBrandReelsProductionSecunderabad = React.lazy(() => import('./ProductBrandReelsProductionSecunderabad'));
const ProductBrandReelsProductionKondapur = React.lazy(() => import('./ProductBrandReelsProductionKondapur'));
const ProductBrandReelsProductionJubileeHills = React.lazy(() => import('./ProductBrandReelsProductionJubileeHills'));
const ProductBrandReelsProductionMadhapur = React.lazy(() => import('./ProductBrandReelsProductionMadhapur'));
const ProductBrandReelsProductionBanjaraHills = React.lazy(() => import('./ProductBrandReelsProductionBanjaraHills'));
const ProductBrandReelsProductionKukatpally = React.lazy(() => import('./ProductBrandReelsProductionKukatpally'));
const RestaurantFoodReelsProduction = React.lazy(() => import('./RestaurantFoodReelsProduction'));
const RestaurantFoodReelsProductionGachibowli = React.lazy(() => import('./RestaurantFoodReelsProductionGachibowli'));
const RestaurantFoodReelsProductionSecunderabad = React.lazy(() => import('./RestaurantFoodReelsProductionSecunderabad'));
const RestaurantFoodReelsProductionKondapur = React.lazy(() => import('./RestaurantFoodReelsProductionKondapur'));
const RestaurantFoodReelsProductionJubileeHills = React.lazy(() => import('./RestaurantFoodReelsProductionJubileeHills'));
const RestaurantFoodReelsProductionMadhapur = React.lazy(() => import('./RestaurantFoodReelsProductionMadhapur'));
const RestaurantFoodReelsProductionBanjaraHills = React.lazy(() => import('./RestaurantFoodReelsProductionBanjaraHills'));
const RestaurantFoodReelsProductionKukatpally = React.lazy(() => import('./RestaurantFoodReelsProductionKukatpally'));
const WeddingEventHighlightReels = React.lazy(() => import('./WeddingEventHighlightReels'));
const WeddingEventHighlightReelsGachibowli = React.lazy(() => import('./WeddingEventHighlightReelsGachibowli'));
const WeddingEventHighlightReelsSecunderabad = React.lazy(() => import('./WeddingEventHighlightReelsSecunderabad'));
const WeddingEventHighlightReelsKondapur = React.lazy(() => import('./WeddingEventHighlightReelsKondapur'));
const WeddingEventHighlightReelsJubileeHills = React.lazy(() => import('./WeddingEventHighlightReelsJubileeHills'));
const WeddingEventHighlightReelsMadhapur = React.lazy(() => import('./WeddingEventHighlightReelsMadhapur'));
const WeddingEventHighlightReelsBanjaraHills = React.lazy(() => import('./WeddingEventHighlightReelsBanjaraHills'));
const WeddingEventHighlightReelsKukatpally = React.lazy(() => import('./WeddingEventHighlightReelsKukatpally'));
const BirthdayPartyPlanningServicesHyderabad = React.lazy(() => import('./BirthdayPartyPlanningServicesHyderabad'));
const BirthdayPartyPlanningServicesGachibowli = React.lazy(() => import('./BirthdayPartyPlanningServicesGachibowli'));
const BirthdayPartyPlanningServicesSecunderabad = React.lazy(() => import('./BirthdayPartyPlanningServicesSecunderabad'));
const BirthdayPartyPlanningServicesKondapur = React.lazy(() => import('./BirthdayPartyPlanningServicesKondapur'));
const BirthdayPartyPlanningServicesJubileeHills = React.lazy(() => import('./BirthdayPartyPlanningServicesJubileeHills'));
const BirthdayPartyPlanningServicesMadhapur = React.lazy(() => import('./BirthdayPartyPlanningServicesMadhapur'));
const BirthdayPartyPlanningServicesBanjaraHills = React.lazy(() => import('./BirthdayPartyPlanningServicesBanjaraHills'));
const BirthdayPartyPlanningServicesKukatpally = React.lazy(() => import('./BirthdayPartyPlanningServicesKukatpally'));
const SurprisePartyPlanningServices = React.lazy(() => import('./SurprisePartyPlanningServices'));
const SurprisePartyPlanningServicesGachibowli = React.lazy(() => import('./SurprisePartyPlanningServicesGachibowli'));
const SurprisePartyPlanningServicesSecunderabad = React.lazy(() => import('./SurprisePartyPlanningServicesSecunderabad'));
const SurprisePartyPlanningServicesKondapur = React.lazy(() => import('./SurprisePartyPlanningServicesKondapur'));
const SurprisePartyPlanningServicesJubileeHills = React.lazy(() => import('./SurprisePartyPlanningServicesJubileeHills'));
const SurprisePartyPlanningServicesMadhapur = React.lazy(() => import('./SurprisePartyPlanningServicesMadhapur'));
const SurprisePartyPlanningServicesBanjaraHills = React.lazy(() => import('./SurprisePartyPlanningServicesBanjaraHills'));
const SurprisePartyPlanningServicesKukatpally = React.lazy(() => import('./SurprisePartyPlanningServicesKukatpally'));
const AiChatbotIntegrationServices = React.lazy(() => import('./AiChatbotIntegrationServices'));
const AiChatbotIntegrationServicesGachibowli = React.lazy(() => import('./AiChatbotIntegrationServicesGachibowli'));
const AiChatbotIntegrationServicesSecunderabad = React.lazy(() => import('./AiChatbotIntegrationServicesSecunderabad'));
const AiChatbotIntegrationServicesKondapur = React.lazy(() => import('./AiChatbotIntegrationServicesKondapur'));
const AiChatbotIntegrationServicesJubileeHills = React.lazy(() => import('./AiChatbotIntegrationServicesJubileeHills'));
const AiChatbotIntegrationServicesMadhapur = React.lazy(() => import('./AiChatbotIntegrationServicesMadhapur'));
const AiChatbotIntegrationServicesBanjaraHills = React.lazy(() => import('./AiChatbotIntegrationServicesBanjaraHills'));
const AiChatbotIntegrationServicesKukatpally = React.lazy(() => import('./AiChatbotIntegrationServicesKukatpally'));
const HousePartyEventPlanningServices = React.lazy(() => import('./HousePartyEventPlanningServices'));
const HousePartyEventPlanningServicesGachibowli = React.lazy(() => import('./HousePartyEventPlanningServicesGachibowli'));
const HousePartyEventPlanningServicesSecunderabad = React.lazy(() => import('./HousePartyEventPlanningServicesSecunderabad'));
const HousePartyEventPlanningServicesKondapur = React.lazy(() => import('./HousePartyEventPlanningServicesKondapur'));
const HousePartyEventPlanningServicesJubileeHills = React.lazy(() => import('./HousePartyEventPlanningServicesJubileeHills'));
const HousePartyEventPlanningServicesMadhapur = React.lazy(() => import('./HousePartyEventPlanningServicesMadhapur'));
const HousePartyEventPlanningServicesBanjaraHills = React.lazy(() => import('./HousePartyEventPlanningServicesBanjaraHills'));
const HousePartyEventPlanningServicesKukatpally = React.lazy(() => import('./HousePartyEventPlanningServicesKukatpally'));
const LogoBrandDesign = React.lazy(() => import('./LogoBrandDesign'));
const LogoBrandDesignGachibowli = React.lazy(() => import('./LogoBrandDesignGachibowli'));
const LogoBrandDesignSecunderabad = React.lazy(() => import('./LogoBrandDesignSecunderabad'));
const LogoBrandDesignKondapur = React.lazy(() => import('./LogoBrandDesignKondapur'));
const LogoBrandDesignJubileeHills = React.lazy(() => import('./LogoBrandDesignJubileeHills'));
const LogoBrandDesignMadhapur = React.lazy(() => import('./LogoBrandDesignMadhapur'));
const LogoBrandDesignBanjaraHills = React.lazy(() => import('./LogoBrandDesignBanjaraHills'));
const LogoBrandDesignKukatpally = React.lazy(() => import('./LogoBrandDesignKukatpally'));
const ModularKitchenDesignersHyderabad = React.lazy(() => import('./ModularKitchenDesignersHyderabad'));
const ModularKitchenDesignersGachibowli = React.lazy(() => import('./ModularKitchenDesignersGachibowli'));
const ModularKitchenDesignersSecunderabad = React.lazy(() => import('./ModularKitchenDesignersSecunderabad'));
const ModularKitchenDesignersKondapur = React.lazy(() => import('./ModularKitchenDesignersKondapur'));
const ModularKitchenDesignersJubileeHills = React.lazy(() => import('./ModularKitchenDesignersJubileeHills'));
const ModularKitchenDesignersMadhapur = React.lazy(() => import('./ModularKitchenDesignersMadhapur'));
const ModularKitchenDesignersBanjaraHills = React.lazy(() => import('./ModularKitchenDesignersBanjaraHills'));
const ModularKitchenDesignersKukatpally = React.lazy(() => import('./ModularKitchenDesignersKukatpally'));
const BedroomLivingRoomInteriorDesign = React.lazy(() => import('./BedroomLivingRoomInteriorDesign'));
const BedroomLivingRoomInteriorDesignGachibowli = React.lazy(() => import('./BedroomLivingRoomInteriorDesignGachibowli'));
const BedroomLivingRoomInteriorDesignSecunderabad = React.lazy(() => import('./BedroomLivingRoomInteriorDesignSecunderabad'));
const BedroomLivingRoomInteriorDesignKondapur = React.lazy(() => import('./BedroomLivingRoomInteriorDesignKondapur'));
const BedroomLivingRoomInteriorDesignJubileeHills = React.lazy(() => import('./BedroomLivingRoomInteriorDesignJubileeHills'));
const BedroomLivingRoomInteriorDesignMadhapur = React.lazy(() => import('./BedroomLivingRoomInteriorDesignMadhapur'));
const BedroomLivingRoomInteriorDesignBanjaraHills = React.lazy(() => import('./BedroomLivingRoomInteriorDesignBanjaraHills'));
const BedroomLivingRoomInteriorDesignKukatpally = React.lazy(() => import('./BedroomLivingRoomInteriorDesignKukatpally'));
const HomeInteriorDesignConsultation = React.lazy(() => import('./HomeInteriorDesignConsultation'));
const HomeInteriorDesignConsultationGachibowli = React.lazy(() => import('./HomeInteriorDesignConsultationGachibowli'));
const HomeInteriorDesignConsultationSecunderabad = React.lazy(() => import('./HomeInteriorDesignConsultationSecunderabad'));
const HomeInteriorDesignConsultationKondapur = React.lazy(() => import('./HomeInteriorDesignConsultationKondapur'));
const HomeInteriorDesignConsultationJubileeHills = React.lazy(() => import('./HomeInteriorDesignConsultationJubileeHills'));
const HomeInteriorDesignConsultationMadhapur = React.lazy(() => import('./HomeInteriorDesignConsultationMadhapur'));
const HomeInteriorDesignConsultationBanjaraHills = React.lazy(() => import('./HomeInteriorDesignConsultationBanjaraHills'));
const HomeInteriorDesignConsultationKukatpally = React.lazy(() => import('./HomeInteriorDesignConsultationKukatpally'));
const MotionGraphicsTitleAnimation = React.lazy(() => import('./MotionGraphicsTitleAnimation'));
const MotionGraphicsTitleAnimationGachibowli = React.lazy(() => import('./MotionGraphicsTitleAnimationGachibowli'));
const MotionGraphicsTitleAnimationSecunderabad = React.lazy(() => import('./MotionGraphicsTitleAnimationSecunderabad'));
const MotionGraphicsTitleAnimationKondapur = React.lazy(() => import('./MotionGraphicsTitleAnimationKondapur'));
const MotionGraphicsTitleAnimationJubileeHills = React.lazy(() => import('./MotionGraphicsTitleAnimationJubileeHills'));
const MotionGraphicsTitleAnimationMadhapur = React.lazy(() => import('./MotionGraphicsTitleAnimationMadhapur'));
const MotionGraphicsTitleAnimationBanjaraHills = React.lazy(() => import('./MotionGraphicsTitleAnimationBanjaraHills'));
const MotionGraphicsTitleAnimationKukatpally = React.lazy(() => import('./MotionGraphicsTitleAnimationKukatpally'));
const PodcastVideoEditorsHyderabad = React.lazy(() => import('./PodcastVideoEditorsHyderabad'));
const PodcastVideoEditorsGachibowli = React.lazy(() => import('./PodcastVideoEditorsGachibowli'));
const PodcastVideoEditorsSecunderabad = React.lazy(() => import('./PodcastVideoEditorsSecunderabad'));
const PodcastVideoEditorsKondapur = React.lazy(() => import('./PodcastVideoEditorsKondapur'));
const PodcastVideoEditorsJubileeHills = React.lazy(() => import('./PodcastVideoEditorsJubileeHills'));
const PodcastVideoEditorsMadhapur = React.lazy(() => import('./PodcastVideoEditorsMadhapur'));
const PodcastVideoEditorsBanjaraHills = React.lazy(() => import('./PodcastVideoEditorsBanjaraHills'));
const PodcastVideoEditorsKukatpally = React.lazy(() => import('./PodcastVideoEditorsKukatpally'));
const VideoEditingServices = React.lazy(() => import('./VideoEditingServices'));
const VideoEditingServicesGachibowli = React.lazy(() => import('./VideoEditingServicesGachibowli'));
const VideoEditingServicesSecunderabad = React.lazy(() => import('./VideoEditingServicesSecunderabad'));
const VideoEditingServicesKondapur = React.lazy(() => import('./VideoEditingServicesKondapur'));
const VideoEditingServicesJubileeHills = React.lazy(() => import('./VideoEditingServicesJubileeHills'));
const VideoEditingServicesMadhapur = React.lazy(() => import('./VideoEditingServicesMadhapur'));
const VideoEditingServicesBanjaraHills = React.lazy(() => import('./VideoEditingServicesBanjaraHills'));
const VideoEditingServicesKukatpally = React.lazy(() => import('./VideoEditingServicesKukatpally'));
const WeddingEventVideoEditing = React.lazy(() => import('./WeddingEventVideoEditing'));
const WeddingEventVideoEditingGachibowli = React.lazy(() => import('./WeddingEventVideoEditingGachibowli'));
const WeddingEventVideoEditingSecunderabad = React.lazy(() => import('./WeddingEventVideoEditingSecunderabad'));
const WeddingEventVideoEditingKondapur = React.lazy(() => import('./WeddingEventVideoEditingKondapur'));
const WeddingEventVideoEditingJubileeHills = React.lazy(() => import('./WeddingEventVideoEditingJubileeHills'));
const WeddingEventVideoEditingMadhapur = React.lazy(() => import('./WeddingEventVideoEditingMadhapur'));
const WeddingEventVideoEditingBanjaraHills = React.lazy(() => import('./WeddingEventVideoEditingBanjaraHills'));
const WeddingEventVideoEditingKukatpally = React.lazy(() => import('./WeddingEventVideoEditingKukatpally'));
const BirthdayPartyAnchorsHosts = React.lazy(() => import('./BirthdayPartyAnchorsHosts'));
const BirthdayPartyAnchorsHostsGachibowli = React.lazy(() => import('./BirthdayPartyAnchorsHostsGachibowli'));
const BirthdayPartyAnchorsHostsSecunderabad = React.lazy(() => import('./BirthdayPartyAnchorsHostsSecunderabad'));
const BirthdayPartyAnchorsHostsKondapur = React.lazy(() => import('./BirthdayPartyAnchorsHostsKondapur'));
const BirthdayPartyAnchorsHostsJubileeHills = React.lazy(() => import('./BirthdayPartyAnchorsHostsJubileeHills'));
const BirthdayPartyAnchorsHostsMadhapur = React.lazy(() => import('./BirthdayPartyAnchorsHostsMadhapur'));
const BirthdayPartyAnchorsHostsBanjaraHills = React.lazy(() => import('./BirthdayPartyAnchorsHostsBanjaraHills'));
const BirthdayPartyAnchorsHostsKukatpally = React.lazy(() => import('./BirthdayPartyAnchorsHostsKukatpally'));
const OfficeCommercialInteriorDesign = React.lazy(() => import('./OfficeCommercialInteriorDesign'));
const OfficeCommercialInteriorDesignGachibowli = React.lazy(() => import('./OfficeCommercialInteriorDesignGachibowli'));
const OfficeCommercialInteriorDesignSecunderabad = React.lazy(() => import('./OfficeCommercialInteriorDesignSecunderabad'));
const OfficeCommercialInteriorDesignKondapur = React.lazy(() => import('./OfficeCommercialInteriorDesignKondapur'));
const OfficeCommercialInteriorDesignJubileeHills = React.lazy(() => import('./OfficeCommercialInteriorDesignJubileeHills'));
const OfficeCommercialInteriorDesignMadhapur = React.lazy(() => import('./OfficeCommercialInteriorDesignMadhapur'));
const OfficeCommercialInteriorDesignBanjaraHills = React.lazy(() => import('./OfficeCommercialInteriorDesignBanjaraHills'));
const OfficeCommercialInteriorDesignKukatpally = React.lazy(() => import('./OfficeCommercialInteriorDesignKukatpally'));
const FurnitureSelectionAndSourcing = React.lazy(() => import('./FurnitureSelectionAndSourcing'));
const FurnitureSelectionAndSourcingGachibowli = React.lazy(() => import('./FurnitureSelectionAndSourcingGachibowli'));
const FurnitureSelectionAndSourcingSecunderabad = React.lazy(() => import('./FurnitureSelectionAndSourcingSecunderabad'));
const FurnitureSelectionAndSourcingKondapur = React.lazy(() => import('./FurnitureSelectionAndSourcingKondapur'));
const FurnitureSelectionAndSourcingJubileeHills = React.lazy(() => import('./FurnitureSelectionAndSourcingJubileeHills'));
const FurnitureSelectionAndSourcingMadhapur = React.lazy(() => import('./FurnitureSelectionAndSourcingMadhapur'));
const FurnitureSelectionAndSourcingBanjaraHills = React.lazy(() => import('./FurnitureSelectionAndSourcingBanjaraHills'));
const FurnitureSelectionAndSourcingKukatpally = React.lazy(() => import('./FurnitureSelectionAndSourcingKukatpally'));
const KidsPartyEntertainersMagicians = React.lazy(() => import('./KidsPartyEntertainersMagicians'));
const KidsPartyEntertainersMagiciansGachibowli = React.lazy(() => import('./KidsPartyEntertainersMagiciansGachibowli'));
const KidsPartyEntertainersMagiciansSecunderabad = React.lazy(() => import('./KidsPartyEntertainersMagiciansSecunderabad'));
const KidsPartyEntertainersMagiciansKondapur = React.lazy(() => import('./KidsPartyEntertainersMagiciansKondapur'));
const KidsPartyEntertainersMagiciansJubileeHills = React.lazy(() => import('./KidsPartyEntertainersMagiciansJubileeHills'));
const KidsPartyEntertainersMagiciansMadhapur = React.lazy(() => import('./KidsPartyEntertainersMagiciansMadhapur'));
const KidsPartyEntertainersMagiciansBanjaraHills = React.lazy(() => import('./KidsPartyEntertainersMagiciansBanjaraHills'));
const KidsPartyEntertainersMagiciansKukatpally = React.lazy(() => import('./KidsPartyEntertainersMagiciansKukatpally'));
const HomeWallPaintingServices = React.lazy(() => import('./HomeWallPaintingServices'));
const HomeWallPaintingServicesGachibowli = React.lazy(() => import('./HomeWallPaintingServicesGachibowli'));
const HomeWallPaintingServicesSecunderabad = React.lazy(() => import('./HomeWallPaintingServicesSecunderabad'));
const HomeWallPaintingServicesKondapur = React.lazy(() => import('./HomeWallPaintingServicesKondapur'));
const HomeWallPaintingServicesJubileeHills = React.lazy(() => import('./HomeWallPaintingServicesJubileeHills'));
const HomeWallPaintingServicesMadhapur = React.lazy(() => import('./HomeWallPaintingServicesMadhapur'));
const HomeWallPaintingServicesBanjaraHills = React.lazy(() => import('./HomeWallPaintingServicesBanjaraHills'));
const HomeWallPaintingServicesKukatpally = React.lazy(() => import('./HomeWallPaintingServicesKukatpally'));
const BudgetHomeInteriorMakeover = React.lazy(() => import('./BudgetHomeInteriorMakeover'));
const BudgetHomeInteriorMakeoverGachibowli = React.lazy(() => import('./BudgetHomeInteriorMakeoverGachibowli'));
const BudgetHomeInteriorMakeoverSecunderabad = React.lazy(() => import('./BudgetHomeInteriorMakeoverSecunderabad'));
const BudgetHomeInteriorMakeoverKondapur = React.lazy(() => import('./BudgetHomeInteriorMakeoverKondapur'));
const BudgetHomeInteriorMakeoverJubileeHills = React.lazy(() => import('./BudgetHomeInteriorMakeoverJubileeHills'));
const BudgetHomeInteriorMakeoverMadhapur = React.lazy(() => import('./BudgetHomeInteriorMakeoverMadhapur'));
const BudgetHomeInteriorMakeoverBanjaraHills = React.lazy(() => import('./BudgetHomeInteriorMakeoverBanjaraHills'));
const BudgetHomeInteriorMakeoverKukatpally = React.lazy(() => import('./BudgetHomeInteriorMakeoverKukatpally'));
const WardrobeStorageCabinetDesign = React.lazy(() => import('./WardrobeStorageCabinetDesign'));
const WardrobeStorageCabinetDesignGachibowli = React.lazy(() => import('./WardrobeStorageCabinetDesignGachibowli'));
const WardrobeStorageCabinetDesignSecunderabad = React.lazy(() => import('./WardrobeStorageCabinetDesignSecunderabad'));
const WardrobeStorageCabinetDesignKondapur = React.lazy(() => import('./WardrobeStorageCabinetDesignKondapur'));
const WardrobeStorageCabinetDesignJubileeHills = React.lazy(() => import('./WardrobeStorageCabinetDesignJubileeHills'));
const WardrobeStorageCabinetDesignMadhapur = React.lazy(() => import('./WardrobeStorageCabinetDesignMadhapur'));
const WardrobeStorageCabinetDesignBanjaraHills = React.lazy(() => import('./WardrobeStorageCabinetDesignBanjaraHills'));
const WardrobeStorageCabinetDesignKukatpally = React.lazy(() => import('./WardrobeStorageCabinetDesignKukatpally'));
const ResidentialCommercialLightingDesign = React.lazy(() => import('./ResidentialCommercialLightingDesign'));
const ResidentialCommercialLightingDesignGachibowli = React.lazy(() => import('./ResidentialCommercialLightingDesignGachibowli'));
const ResidentialCommercialLightingDesignSecunderabad = React.lazy(() => import('./ResidentialCommercialLightingDesignSecunderabad'));
const ResidentialCommercialLightingDesignKondapur = React.lazy(() => import('./ResidentialCommercialLightingDesignKondapur'));
const ResidentialCommercialLightingDesignJubileeHills = React.lazy(() => import('./ResidentialCommercialLightingDesignJubileeHills'));
const ResidentialCommercialLightingDesignMadhapur = React.lazy(() => import('./ResidentialCommercialLightingDesignMadhapur'));
const ResidentialCommercialLightingDesignBanjaraHills = React.lazy(() => import('./ResidentialCommercialLightingDesignBanjaraHills'));
const ResidentialCommercialLightingDesignKukatpally = React.lazy(() => import('./ResidentialCommercialLightingDesignKukatpally'));
const MobileAppUiUxRevamp = React.lazy(() => import('./MobileAppUiUxRevamp'));
const MobileAppUiUxRevampGachibowli = React.lazy(() => import('./MobileAppUiUxRevampGachibowli'));
const MobileAppUiUxRevampSecunderabad = React.lazy(() => import('./MobileAppUiUxRevampSecunderabad'));
const MobileAppUiUxRevampKondapur = React.lazy(() => import('./MobileAppUiUxRevampKondapur'));
const MobileAppUiUxRevampJubileeHills = React.lazy(() => import('./MobileAppUiUxRevampJubileeHills'));
const MobileAppUiUxRevampMadhapur = React.lazy(() => import('./MobileAppUiUxRevampMadhapur'));
const MobileAppUiUxRevampBanjaraHills = React.lazy(() => import('./MobileAppUiUxRevampBanjaraHills'));
const MobileAppUiUxRevampKukatpally = React.lazy(() => import('./MobileAppUiUxRevampKukatpally'));
const WeddingSangeetMcAnchors = React.lazy(() => import('./WeddingSangeetMcAnchors'));
const WeddingSangeetMcAnchorsGachibowli = React.lazy(() => import('./WeddingSangeetMcAnchorsGachibowli'));
const WeddingSangeetMcAnchorsSecunderabad = React.lazy(() => import('./WeddingSangeetMcAnchorsSecunderabad'));
const WeddingSangeetMcAnchorsKondapur = React.lazy(() => import('./WeddingSangeetMcAnchorsKondapur'));
const WeddingSangeetMcAnchorsJubileeHills = React.lazy(() => import('./WeddingSangeetMcAnchorsJubileeHills'));
const WeddingSangeetMcAnchorsMadhapur = React.lazy(() => import('./WeddingSangeetMcAnchorsMadhapur'));
const WeddingSangeetMcAnchorsBanjaraHills = React.lazy(() => import('./WeddingSangeetMcAnchorsBanjaraHills'));
const WeddingSangeetMcAnchorsKukatpally = React.lazy(() => import('./WeddingSangeetMcAnchorsKukatpally'));

export default function SeoRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
          <p className="text-base font-semibold">Loading Page Details...</p>
        </div>
      }
    >
      <Routes>
        <Route path="/birthday-event-planning" element={<BirthdayEventPlanning />} />
        <Route path="/birthday-event-planning-gachibowli" element={<BirthdayEventPlanningGachibowli />} />
        <Route path="/birthday-event-planning-secunderabad" element={<BirthdayEventPlanningSecunderabad />} />
        <Route path="/birthday-event-planning-kondapur" element={<BirthdayEventPlanningKondapur />} />
        <Route path="/birthday-event-planning-jubilee-hills" element={<BirthdayEventPlanningJubileeHills />} />
        <Route path="/birthday-event-planning-madhapur" element={<BirthdayEventPlanningMadhapur />} />
        <Route path="/birthday-event-planning-banjara-hills" element={<BirthdayEventPlanningBanjaraHills />} />
        <Route path="/birthday-event-planning-kukatpally" element={<BirthdayEventPlanningKukatpally />} />
        <Route path="/photography-services" element={<PhotographyServices />} />
        <Route path="/photography-services-gachibowli" element={<PhotographyServicesGachibowli />} />
        <Route path="/photography-services-secunderabad" element={<PhotographyServicesSecunderabad />} />
        <Route path="/photography-services-kondapur" element={<PhotographyServicesKondapur />} />
        <Route path="/photography-services-jubilee-hills" element={<PhotographyServicesJubileeHills />} />
        <Route path="/photography-services-madhapur" element={<PhotographyServicesMadhapur />} />
        <Route path="/photography-services-banjara-hills" element={<PhotographyServicesBanjaraHills />} />
        <Route path="/photography-services-kukatpally" element={<PhotographyServicesKukatpally />} />
        <Route path="/kids-birthday-party-planners-hyderabad" element={<KidsBirthdayPartyPlannersHyderabad />} />
        <Route path="/kids-birthday-party-planners-gachibowli" element={<KidsBirthdayPartyPlannersGachibowli />} />
        <Route path="/kids-birthday-party-planners-secunderabad" element={<KidsBirthdayPartyPlannersSecunderabad />} />
        <Route path="/kids-birthday-party-planners-kondapur" element={<KidsBirthdayPartyPlannersKondapur />} />
        <Route path="/kids-birthday-party-planners-jubilee-hills" element={<KidsBirthdayPartyPlannersJubileeHills />} />
        <Route path="/kids-birthday-party-planners-madhapur" element={<KidsBirthdayPartyPlannersMadhapur />} />
        <Route path="/kids-birthday-party-planners-banjara-hills" element={<KidsBirthdayPartyPlannersBanjaraHills />} />
        <Route path="/kids-birthday-party-planners-kukatpally" element={<KidsBirthdayPartyPlannersKukatpally />} />
        <Route path="/corporate-event-planners-hyderabad" element={<CorporateEventPlannersHyderabad />} />
        <Route path="/corporate-event-planners-gachibowli" element={<CorporateEventPlannersGachibowli />} />
        <Route path="/corporate-event-planners-secunderabad" element={<CorporateEventPlannersSecunderabad />} />
        <Route path="/corporate-event-planners-kondapur" element={<CorporateEventPlannersKondapur />} />
        <Route path="/corporate-event-planners-jubilee-hills" element={<CorporateEventPlannersJubileeHills />} />
        <Route path="/corporate-event-planners-madhapur" element={<CorporateEventPlannersMadhapur />} />
        <Route path="/corporate-event-planners-banjara-hills" element={<CorporateEventPlannersBanjaraHills />} />
        <Route path="/corporate-event-planners-kukatpally" element={<CorporateEventPlannersKukatpally />} />
        <Route path="/room-renovation-interior-design-hyderabad" element={<RoomRenovationInteriorDesignHyderabad />} />
        <Route path="/room-renovation-interior-design-gachibowli" element={<RoomRenovationInteriorDesignGachibowli />} />
        <Route path="/room-renovation-interior-design-secunderabad" element={<RoomRenovationInteriorDesignSecunderabad />} />
        <Route path="/room-renovation-interior-design-kondapur" element={<RoomRenovationInteriorDesignKondapur />} />
        <Route path="/room-renovation-interior-design-jubilee-hills" element={<RoomRenovationInteriorDesignJubileeHills />} />
        <Route path="/room-renovation-interior-design-madhapur" element={<RoomRenovationInteriorDesignMadhapur />} />
        <Route path="/room-renovation-interior-design-banjara-hills" element={<RoomRenovationInteriorDesignBanjaraHills />} />
        <Route path="/room-renovation-interior-design-kukatpally" element={<RoomRenovationInteriorDesignKukatpally />} />
        <Route path="/living-room-interior-design-hyderabad" element={<LivingRoomInteriorDesignHyderabad />} />
        <Route path="/living-room-interior-design-gachibowli" element={<LivingRoomInteriorDesignGachibowli />} />
        <Route path="/living-room-interior-design-secunderabad" element={<LivingRoomInteriorDesignSecunderabad />} />
        <Route path="/living-room-interior-design-kondapur" element={<LivingRoomInteriorDesignKondapur />} />
        <Route path="/living-room-interior-design-jubilee-hills" element={<LivingRoomInteriorDesignJubileeHills />} />
        <Route path="/living-room-interior-design-madhapur" element={<LivingRoomInteriorDesignMadhapur />} />
        <Route path="/living-room-interior-design-banjara-hills" element={<LivingRoomInteriorDesignBanjaraHills />} />
        <Route path="/living-room-interior-design-kukatpally" element={<LivingRoomInteriorDesignKukatpally />} />
        <Route path="/interior-designers-hyderabad" element={<InteriorDesignersHyderabad />} />
        <Route path="/interior-designers-gachibowli" element={<InteriorDesignersGachibowli />} />
        <Route path="/interior-designers-secunderabad" element={<InteriorDesignersSecunderabad />} />
        <Route path="/interior-designers-kondapur" element={<InteriorDesignersKondapur />} />
        <Route path="/interior-designers-jubilee-hills" element={<InteriorDesignersJubileeHills />} />
        <Route path="/interior-designers-madhapur" element={<InteriorDesignersMadhapur />} />
        <Route path="/interior-designers-banjara-hills" element={<InteriorDesignersBanjaraHills />} />
        <Route path="/interior-designers-kukatpally" element={<InteriorDesignersKukatpally />} />
        <Route path="/reels-video-shoot-services-hyderabad" element={<ReelsVideoShootServicesHyderabad />} />
        <Route path="/reels-video-shoot-services-gachibowli" element={<ReelsVideoShootServicesGachibowli />} />
        <Route path="/reels-video-shoot-services-secunderabad" element={<ReelsVideoShootServicesSecunderabad />} />
        <Route path="/reels-video-shoot-services-kondapur" element={<ReelsVideoShootServicesKondapur />} />
        <Route path="/reels-video-shoot-services-jubilee-hills" element={<ReelsVideoShootServicesJubileeHills />} />
        <Route path="/reels-video-shoot-services-madhapur" element={<ReelsVideoShootServicesMadhapur />} />
        <Route path="/reels-video-shoot-services-banjara-hills" element={<ReelsVideoShootServicesBanjaraHills />} />
        <Route path="/reels-video-shoot-services-kukatpally" element={<ReelsVideoShootServicesKukatpally />} />
        <Route path="/brand-content-creation-photography" element={<BrandContentCreationPhotography />} />
        <Route path="/brand-content-creation-photography-gachibowli" element={<BrandContentCreationPhotographyGachibowli />} />
        <Route path="/brand-content-creation-photography-secunderabad" element={<BrandContentCreationPhotographySecunderabad />} />
        <Route path="/brand-content-creation-photography-kondapur" element={<BrandContentCreationPhotographyKondapur />} />
        <Route path="/brand-content-creation-photography-jubilee-hills" element={<BrandContentCreationPhotographyJubileeHills />} />
        <Route path="/brand-content-creation-photography-madhapur" element={<BrandContentCreationPhotographyMadhapur />} />
        <Route path="/brand-content-creation-photography-banjara-hills" element={<BrandContentCreationPhotographyBanjaraHills />} />
        <Route path="/brand-content-creation-photography-kukatpally" element={<BrandContentCreationPhotographyKukatpally />} />
        <Route path="/brand-identity-design-services" element={<BrandIdentityDesignServices />} />
        <Route path="/brand-identity-design-services-gachibowli" element={<BrandIdentityDesignServicesGachibowli />} />
        <Route path="/brand-identity-design-services-secunderabad" element={<BrandIdentityDesignServicesSecunderabad />} />
        <Route path="/brand-identity-design-services-kondapur" element={<BrandIdentityDesignServicesKondapur />} />
        <Route path="/brand-identity-design-services-jubilee-hills" element={<BrandIdentityDesignServicesJubileeHills />} />
        <Route path="/brand-identity-design-services-madhapur" element={<BrandIdentityDesignServicesMadhapur />} />
        <Route path="/brand-identity-design-services-banjara-hills" element={<BrandIdentityDesignServicesBanjaraHills />} />
        <Route path="/brand-identity-design-services-kukatpally" element={<BrandIdentityDesignServicesKukatpally />} />
        <Route path="/business-website-development" element={<BusinessWebsiteDevelopment />} />
        <Route path="/business-website-development-gachibowli" element={<BusinessWebsiteDevelopmentGachibowli />} />
        <Route path="/business-website-development-secunderabad" element={<BusinessWebsiteDevelopmentSecunderabad />} />
        <Route path="/business-website-development-kondapur" element={<BusinessWebsiteDevelopmentKondapur />} />
        <Route path="/business-website-development-jubilee-hills" element={<BusinessWebsiteDevelopmentJubileeHills />} />
        <Route path="/business-website-development-madhapur" element={<BusinessWebsiteDevelopmentMadhapur />} />
        <Route path="/business-website-development-banjara-hills" element={<BusinessWebsiteDevelopmentBanjaraHills />} />
        <Route path="/business-website-development-kukatpally" element={<BusinessWebsiteDevelopmentKukatpally />} />
        <Route path="/graphic-design-marketing-services" element={<GraphicDesignMarketingServices />} />
        <Route path="/graphic-design-marketing-services-gachibowli" element={<GraphicDesignMarketingServicesGachibowli />} />
        <Route path="/graphic-design-marketing-services-secunderabad" element={<GraphicDesignMarketingServicesSecunderabad />} />
        <Route path="/graphic-design-marketing-services-kondapur" element={<GraphicDesignMarketingServicesKondapur />} />
        <Route path="/graphic-design-marketing-services-jubilee-hills" element={<GraphicDesignMarketingServicesJubileeHills />} />
        <Route path="/graphic-design-marketing-services-madhapur" element={<GraphicDesignMarketingServicesMadhapur />} />
        <Route path="/graphic-design-marketing-services-banjara-hills" element={<GraphicDesignMarketingServicesBanjaraHills />} />
        <Route path="/graphic-design-marketing-services-kukatpally" element={<GraphicDesignMarketingServicesKukatpally />} />
        <Route path="/content-editing-services" element={<ContentEditingServices />} />
        <Route path="/content-editing-services-gachibowli" element={<ContentEditingServicesGachibowli />} />
        <Route path="/content-editing-services-secunderabad" element={<ContentEditingServicesSecunderabad />} />
        <Route path="/content-editing-services-kondapur" element={<ContentEditingServicesKondapur />} />
        <Route path="/content-editing-services-jubilee-hills" element={<ContentEditingServicesJubileeHills />} />
        <Route path="/content-editing-services-madhapur" element={<ContentEditingServicesMadhapur />} />
        <Route path="/content-editing-services-banjara-hills" element={<ContentEditingServicesBanjaraHills />} />
        <Route path="/content-editing-services-kukatpally" element={<ContentEditingServicesKukatpally />} />
        <Route path="/full-media-production-services" element={<FullMediaProductionServices />} />
        <Route path="/full-media-production-services-gachibowli" element={<FullMediaProductionServicesGachibowli />} />
        <Route path="/full-media-production-services-secunderabad" element={<FullMediaProductionServicesSecunderabad />} />
        <Route path="/full-media-production-services-kondapur" element={<FullMediaProductionServicesKondapur />} />
        <Route path="/full-media-production-services-jubilee-hills" element={<FullMediaProductionServicesJubileeHills />} />
        <Route path="/full-media-production-services-madhapur" element={<FullMediaProductionServicesMadhapur />} />
        <Route path="/full-media-production-services-banjara-hills" element={<FullMediaProductionServicesBanjaraHills />} />
        <Route path="/full-media-production-services-kukatpally" element={<FullMediaProductionServicesKukatpally />} />
        <Route path="/ecommerce-website-development" element={<EcommerceWebsiteDevelopment />} />
        <Route path="/ecommerce-website-development-gachibowli" element={<EcommerceWebsiteDevelopmentGachibowli />} />
        <Route path="/ecommerce-website-development-secunderabad" element={<EcommerceWebsiteDevelopmentSecunderabad />} />
        <Route path="/ecommerce-website-development-kondapur" element={<EcommerceWebsiteDevelopmentKondapur />} />
        <Route path="/ecommerce-website-development-jubilee-hills" element={<EcommerceWebsiteDevelopmentJubileeHills />} />
        <Route path="/ecommerce-website-development-madhapur" element={<EcommerceWebsiteDevelopmentMadhapur />} />
        <Route path="/ecommerce-website-development-banjara-hills" element={<EcommerceWebsiteDevelopmentBanjaraHills />} />
        <Route path="/ecommerce-website-development-kukatpally" element={<EcommerceWebsiteDevelopmentKukatpally />} />
        <Route path="/best-maternity-photographers-hyderabad" element={<BestMaternityPhotographersHyderabad />} />
        <Route path="/best-maternity-photographers-gachibowli" element={<BestMaternityPhotographersGachibowli />} />
        <Route path="/best-maternity-photographers-secunderabad" element={<BestMaternityPhotographersSecunderabad />} />
        <Route path="/best-maternity-photographers-kondapur" element={<BestMaternityPhotographersKondapur />} />
        <Route path="/best-maternity-photographers-jubilee-hills" element={<BestMaternityPhotographersJubileeHills />} />
        <Route path="/best-maternity-photographers-madhapur" element={<BestMaternityPhotographersMadhapur />} />
        <Route path="/best-maternity-photographers-banjara-hills" element={<BestMaternityPhotographersBanjaraHills />} />
        <Route path="/best-maternity-photographers-kukatpally" element={<BestMaternityPhotographersKukatpally />} />
        <Route path="/first-birthday-party-photographers-hyderabad" element={<FirstBirthdayPartyPhotographersHyderabad />} />
        <Route path="/first-birthday-party-photographers-gachibowli" element={<FirstBirthdayPartyPhotographersGachibowli />} />
        <Route path="/first-birthday-party-photographers-secunderabad" element={<FirstBirthdayPartyPhotographersSecunderabad />} />
        <Route path="/first-birthday-party-photographers-kondapur" element={<FirstBirthdayPartyPhotographersKondapur />} />
        <Route path="/first-birthday-party-photographers-jubilee-hills" element={<FirstBirthdayPartyPhotographersJubileeHills />} />
        <Route path="/first-birthday-party-photographers-madhapur" element={<FirstBirthdayPartyPhotographersMadhapur />} />
        <Route path="/first-birthday-party-photographers-banjara-hills" element={<FirstBirthdayPartyPhotographersBanjaraHills />} />
        <Route path="/first-birthday-party-photographers-kukatpally" element={<FirstBirthdayPartyPhotographersKukatpally />} />
        <Route path="/newborn-baby-photography-services-hyderabad" element={<NewbornBabyPhotographyServicesHyderabad />} />
        <Route path="/newborn-baby-photography-services-gachibowli" element={<NewbornBabyPhotographyServicesGachibowli />} />
        <Route path="/newborn-baby-photography-services-secunderabad" element={<NewbornBabyPhotographyServicesSecunderabad />} />
        <Route path="/newborn-baby-photography-services-kondapur" element={<NewbornBabyPhotographyServicesKondapur />} />
        <Route path="/newborn-baby-photography-services-jubilee-hills" element={<NewbornBabyPhotographyServicesJubileeHills />} />
        <Route path="/newborn-baby-photography-services-madhapur" element={<NewbornBabyPhotographyServicesMadhapur />} />
        <Route path="/newborn-baby-photography-services-banjara-hills" element={<NewbornBabyPhotographyServicesBanjaraHills />} />
        <Route path="/newborn-baby-photography-services-kukatpally" element={<NewbornBabyPhotographyServicesKukatpally />} />
        <Route path="/mehndi-haldi-function-photographers-hyderabad" element={<MehndiHaldiFunctionPhotographersHyderabad />} />
        <Route path="/mehndi-haldi-function-photographers-gachibowli" element={<MehndiHaldiFunctionPhotographersGachibowli />} />
        <Route path="/mehndi-haldi-function-photographers-secunderabad" element={<MehndiHaldiFunctionPhotographersSecunderabad />} />
        <Route path="/mehndi-haldi-function-photographers-kondapur" element={<MehndiHaldiFunctionPhotographersKondapur />} />
        <Route path="/mehndi-haldi-function-photographers-jubilee-hills" element={<MehndiHaldiFunctionPhotographersJubileeHills />} />
        <Route path="/mehndi-haldi-function-photographers-madhapur" element={<MehndiHaldiFunctionPhotographersMadhapur />} />
        <Route path="/mehndi-haldi-function-photographers-banjara-hills" element={<MehndiHaldiFunctionPhotographersBanjaraHills />} />
        <Route path="/mehndi-haldi-function-photographers-kukatpally" element={<MehndiHaldiFunctionPhotographersKukatpally />} />
        <Route path="/half-saree-ceremony-photographers-hyderabad" element={<HalfSareeCeremonyPhotographersHyderabad />} />
        <Route path="/half-saree-ceremony-photographers-gachibowli" element={<HalfSareeCeremonyPhotographersGachibowli />} />
        <Route path="/half-saree-ceremony-photographers-secunderabad" element={<HalfSareeCeremonyPhotographersSecunderabad />} />
        <Route path="/half-saree-ceremony-photographers-kondapur" element={<HalfSareeCeremonyPhotographersKondapur />} />
        <Route path="/half-saree-ceremony-photographers-jubilee-hills" element={<HalfSareeCeremonyPhotographersJubileeHills />} />
        <Route path="/half-saree-ceremony-photographers-madhapur" element={<HalfSareeCeremonyPhotographersMadhapur />} />
        <Route path="/half-saree-ceremony-photographers-banjara-hills" element={<HalfSareeCeremonyPhotographersBanjaraHills />} />
        <Route path="/half-saree-ceremony-photographers-kukatpally" element={<HalfSareeCeremonyPhotographersKukatpally />} />
        <Route path="/birthday-party-photographers-hyderabad" element={<BirthdayPartyPhotographersHyderabad />} />
        <Route path="/birthday-party-photographers-gachibowli" element={<BirthdayPartyPhotographersGachibowli />} />
        <Route path="/birthday-party-photographers-secunderabad" element={<BirthdayPartyPhotographersSecunderabad />} />
        <Route path="/birthday-party-photographers-kondapur" element={<BirthdayPartyPhotographersKondapur />} />
        <Route path="/birthday-party-photographers-jubilee-hills" element={<BirthdayPartyPhotographersJubileeHills />} />
        <Route path="/birthday-party-photographers-madhapur" element={<BirthdayPartyPhotographersMadhapur />} />
        <Route path="/birthday-party-photographers-banjara-hills" element={<BirthdayPartyPhotographersBanjaraHills />} />
        <Route path="/birthday-party-photographers-kukatpally" element={<BirthdayPartyPhotographersKukatpally />} />
        <Route path="/event-planners-hyderabad" element={<EventPlannersHyderabad />} />
        <Route path="/event-planners-gachibowli" element={<EventPlannersGachibowli />} />
        <Route path="/event-planners-secunderabad" element={<EventPlannersSecunderabad />} />
        <Route path="/event-planners-kondapur" element={<EventPlannersKondapur />} />
        <Route path="/event-planners-jubilee-hills" element={<EventPlannersJubileeHills />} />
        <Route path="/event-planners-madhapur" element={<EventPlannersMadhapur />} />
        <Route path="/event-planners-banjara-hills" element={<EventPlannersBanjaraHills />} />
        <Route path="/event-planners-kukatpally" element={<EventPlannersKukatpally />} />
        <Route path="/family-portrait-photographers-hyderabad-telangana" element={<FamilyPortraitPhotographersHyderabadTelangana />} />
        <Route path="/family-portrait-photographers-gachibowli" element={<FamilyPortraitPhotographersGachibowli />} />
        <Route path="/family-portrait-photographers-secunderabad" element={<FamilyPortraitPhotographersSecunderabad />} />
        <Route path="/family-portrait-photographers-kondapur" element={<FamilyPortraitPhotographersKondapur />} />
        <Route path="/family-portrait-photographers-jubilee-hills" element={<FamilyPortraitPhotographersJubileeHills />} />
        <Route path="/family-portrait-photographers-madhapur" element={<FamilyPortraitPhotographersMadhapur />} />
        <Route path="/family-portrait-photographers-banjara-hills" element={<FamilyPortraitPhotographersBanjaraHills />} />
        <Route path="/family-portrait-photographers-kukatpally" element={<FamilyPortraitPhotographersKukatpally />} />
        <Route path="/graduation-portrait-photographers-hyderabad" element={<GraduationPortraitPhotographersHyderabad />} />
        <Route path="/graduation-portrait-photographers-gachibowli" element={<GraduationPortraitPhotographersGachibowli />} />
        <Route path="/graduation-portrait-photographers-secunderabad" element={<GraduationPortraitPhotographersSecunderabad />} />
        <Route path="/graduation-portrait-photographers-kondapur" element={<GraduationPortraitPhotographersKondapur />} />
        <Route path="/graduation-portrait-photographers-jubilee-hills" element={<GraduationPortraitPhotographersJubileeHills />} />
        <Route path="/graduation-portrait-photographers-madhapur" element={<GraduationPortraitPhotographersMadhapur />} />
        <Route path="/graduation-portrait-photographers-banjara-hills" element={<GraduationPortraitPhotographersBanjaraHills />} />
        <Route path="/graduation-portrait-photographers-kukatpally" element={<GraduationPortraitPhotographersKukatpally />} />
        <Route path="/kids-children-photographers-hyderabad" element={<KidsChildrenPhotographersHyderabad />} />
        <Route path="/kids-children-photographers-gachibowli" element={<KidsChildrenPhotographersGachibowli />} />
        <Route path="/kids-children-photographers-secunderabad" element={<KidsChildrenPhotographersSecunderabad />} />
        <Route path="/kids-children-photographers-kondapur" element={<KidsChildrenPhotographersKondapur />} />
        <Route path="/kids-children-photographers-jubilee-hills" element={<KidsChildrenPhotographersJubileeHills />} />
        <Route path="/kids-children-photographers-madhapur" element={<KidsChildrenPhotographersMadhapur />} />
        <Route path="/kids-children-photographers-banjara-hills" element={<KidsChildrenPhotographersBanjaraHills />} />
        <Route path="/kids-children-photographers-kukatpally" element={<KidsChildrenPhotographersKukatpally />} />
        <Route path="/cinematic-themed-photoshoots-hyderabad" element={<CinematicThemedPhotoshootsHyderabad />} />
        <Route path="/cinematic-themed-photoshoots-gachibowli" element={<CinematicThemedPhotoshootsGachibowli />} />
        <Route path="/cinematic-themed-photoshoots-secunderabad" element={<CinematicThemedPhotoshootsSecunderabad />} />
        <Route path="/cinematic-themed-photoshoots-kondapur" element={<CinematicThemedPhotoshootsKondapur />} />
        <Route path="/cinematic-themed-photoshoots-jubilee-hills" element={<CinematicThemedPhotoshootsJubileeHills />} />
        <Route path="/cinematic-themed-photoshoots-madhapur" element={<CinematicThemedPhotoshootsMadhapur />} />
        <Route path="/cinematic-themed-photoshoots-banjara-hills" element={<CinematicThemedPhotoshootsBanjaraHills />} />
        <Route path="/cinematic-themed-photoshoots-kukatpally" element={<CinematicThemedPhotoshootsKukatpally />} />
        <Route path="/anniversary-party-photographers-hyderabad" element={<AnniversaryPartyPhotographersHyderabad />} />
        <Route path="/anniversary-party-photographers-gachibowli" element={<AnniversaryPartyPhotographersGachibowli />} />
        <Route path="/anniversary-party-photographers-secunderabad" element={<AnniversaryPartyPhotographersSecunderabad />} />
        <Route path="/anniversary-party-photographers-kondapur" element={<AnniversaryPartyPhotographersKondapur />} />
        <Route path="/anniversary-party-photographers-jubilee-hills" element={<AnniversaryPartyPhotographersJubileeHills />} />
        <Route path="/anniversary-party-photographers-madhapur" element={<AnniversaryPartyPhotographersMadhapur />} />
        <Route path="/anniversary-party-photographers-banjara-hills" element={<AnniversaryPartyPhotographersBanjaraHills />} />
        <Route path="/anniversary-party-photographers-kukatpally" element={<AnniversaryPartyPhotographersKukatpally />} />
        <Route path="/professional-pet-photographers-hyderabad" element={<ProfessionalPetPhotographersHyderabad />} />
        <Route path="/professional-pet-photographers-gachibowli" element={<ProfessionalPetPhotographersGachibowli />} />
        <Route path="/professional-pet-photographers-secunderabad" element={<ProfessionalPetPhotographersSecunderabad />} />
        <Route path="/professional-pet-photographers-kondapur" element={<ProfessionalPetPhotographersKondapur />} />
        <Route path="/professional-pet-photographers-jubilee-hills" element={<ProfessionalPetPhotographersJubileeHills />} />
        <Route path="/professional-pet-photographers-madhapur" element={<ProfessionalPetPhotographersMadhapur />} />
        <Route path="/professional-pet-photographers-banjara-hills" element={<ProfessionalPetPhotographersBanjaraHills />} />
        <Route path="/professional-pet-photographers-kukatpally" element={<ProfessionalPetPhotographersKukatpally />} />
        <Route path="/fitness-sports-photographers-hyderabad" element={<FitnessSportsPhotographersHyderabad />} />
        <Route path="/fitness-sports-photographers-gachibowli" element={<FitnessSportsPhotographersGachibowli />} />
        <Route path="/fitness-sports-photographers-secunderabad" element={<FitnessSportsPhotographersSecunderabad />} />
        <Route path="/fitness-sports-photographers-kondapur" element={<FitnessSportsPhotographersKondapur />} />
        <Route path="/fitness-sports-photographers-jubilee-hills" element={<FitnessSportsPhotographersJubileeHills />} />
        <Route path="/fitness-sports-photographers-madhapur" element={<FitnessSportsPhotographersMadhapur />} />
        <Route path="/fitness-sports-photographers-banjara-hills" element={<FitnessSportsPhotographersBanjaraHills />} />
        <Route path="/fitness-sports-photographers-kukatpally" element={<FitnessSportsPhotographersKukatpally />} />
        <Route path="/corporate-business-photography-hyderabad" element={<CorporateBusinessPhotographyHyderabad />} />
        <Route path="/corporate-business-photography-gachibowli" element={<CorporateBusinessPhotographyGachibowli />} />
        <Route path="/corporate-business-photography-secunderabad" element={<CorporateBusinessPhotographySecunderabad />} />
        <Route path="/corporate-business-photography-kondapur" element={<CorporateBusinessPhotographyKondapur />} />
        <Route path="/corporate-business-photography-jubilee-hills" element={<CorporateBusinessPhotographyJubileeHills />} />
        <Route path="/corporate-business-photography-madhapur" element={<CorporateBusinessPhotographyMadhapur />} />
        <Route path="/corporate-business-photography-banjara-hills" element={<CorporateBusinessPhotographyBanjaraHills />} />
        <Route path="/corporate-business-photography-kukatpally" element={<CorporateBusinessPhotographyKukatpally />} />
        <Route path="/pre-wedding-couple-photoshoots-hyderabad" element={<PreWeddingCouplePhotoshootsHyderabad />} />
        <Route path="/pre-wedding-couple-photoshoots-gachibowli" element={<PreWeddingCouplePhotoshootsGachibowli />} />
        <Route path="/pre-wedding-couple-photoshoots-secunderabad" element={<PreWeddingCouplePhotoshootsSecunderabad />} />
        <Route path="/pre-wedding-couple-photoshoots-kondapur" element={<PreWeddingCouplePhotoshootsKondapur />} />
        <Route path="/pre-wedding-couple-photoshoots-jubilee-hills" element={<PreWeddingCouplePhotoshootsJubileeHills />} />
        <Route path="/pre-wedding-couple-photoshoots-madhapur" element={<PreWeddingCouplePhotoshootsMadhapur />} />
        <Route path="/pre-wedding-couple-photoshoots-banjara-hills" element={<PreWeddingCouplePhotoshootsBanjaraHills />} />
        <Route path="/pre-wedding-couple-photoshoots-kukatpally" element={<PreWeddingCouplePhotoshootsKukatpally />} />
        <Route path="/commercial-product-photographers-hyderabad" element={<CommercialProductPhotographersHyderabad />} />
        <Route path="/commercial-product-photographers-gachibowli" element={<CommercialProductPhotographersGachibowli />} />
        <Route path="/commercial-product-photographers-secunderabad" element={<CommercialProductPhotographersSecunderabad />} />
        <Route path="/commercial-product-photographers-kondapur" element={<CommercialProductPhotographersKondapur />} />
        <Route path="/commercial-product-photographers-jubilee-hills" element={<CommercialProductPhotographersJubileeHills />} />
        <Route path="/commercial-product-photographers-madhapur" element={<CommercialProductPhotographersMadhapur />} />
        <Route path="/commercial-product-photographers-banjara-hills" element={<CommercialProductPhotographersBanjaraHills />} />
        <Route path="/commercial-product-photographers-kukatpally" element={<CommercialProductPhotographersKukatpally />} />
        <Route path="/baby-milestone-video-production-hyderabad" element={<BabyMilestoneVideoProductionHyderabad />} />
        <Route path="/baby-milestone-video-production-gachibowli" element={<BabyMilestoneVideoProductionGachibowli />} />
        <Route path="/baby-milestone-video-production-secunderabad" element={<BabyMilestoneVideoProductionSecunderabad />} />
        <Route path="/baby-milestone-video-production-kondapur" element={<BabyMilestoneVideoProductionKondapur />} />
        <Route path="/baby-milestone-video-production-jubilee-hills" element={<BabyMilestoneVideoProductionJubileeHills />} />
        <Route path="/baby-milestone-video-production-madhapur" element={<BabyMilestoneVideoProductionMadhapur />} />
        <Route path="/baby-milestone-video-production-banjara-hills" element={<BabyMilestoneVideoProductionBanjaraHills />} />
        <Route path="/baby-milestone-video-production-kukatpally" element={<BabyMilestoneVideoProductionKukatpally />} />
        <Route path="/birthday-event-videographers-hyderabad" element={<BirthdayEventVideographersHyderabad />} />
        <Route path="/birthday-event-videographers-gachibowli" element={<BirthdayEventVideographersGachibowli />} />
        <Route path="/birthday-event-videographers-secunderabad" element={<BirthdayEventVideographersSecunderabad />} />
        <Route path="/birthday-event-videographers-kondapur" element={<BirthdayEventVideographersKondapur />} />
        <Route path="/birthday-event-videographers-jubilee-hills" element={<BirthdayEventVideographersJubileeHills />} />
        <Route path="/birthday-event-videographers-madhapur" element={<BirthdayEventVideographersMadhapur />} />
        <Route path="/birthday-event-videographers-banjara-hills" element={<BirthdayEventVideographersBanjaraHills />} />
        <Route path="/birthday-event-videographers-kukatpally" element={<BirthdayEventVideographersKukatpally />} />
        <Route path="/corporate-brand-story-video-production" element={<CorporateBrandStoryVideoProduction />} />
        <Route path="/corporate-brand-story-video-production-gachibowli" element={<CorporateBrandStoryVideoProductionGachibowli />} />
        <Route path="/corporate-brand-story-video-production-secunderabad" element={<CorporateBrandStoryVideoProductionSecunderabad />} />
        <Route path="/corporate-brand-story-video-production-kondapur" element={<CorporateBrandStoryVideoProductionKondapur />} />
        <Route path="/corporate-brand-story-video-production-jubilee-hills" element={<CorporateBrandStoryVideoProductionJubileeHills />} />
        <Route path="/corporate-brand-story-video-production-madhapur" element={<CorporateBrandStoryVideoProductionMadhapur />} />
        <Route path="/corporate-brand-story-video-production-banjara-hills" element={<CorporateBrandStoryVideoProductionBanjaraHills />} />
        <Route path="/corporate-brand-story-video-production-kukatpally" element={<CorporateBrandStoryVideoProductionKukatpally />} />
        <Route path="/fitness-gym-promo-videos-hyderabad" element={<FitnessGymPromoVideosHyderabad />} />
        <Route path="/fitness-gym-promo-videos-gachibowli" element={<FitnessGymPromoVideosGachibowli />} />
        <Route path="/fitness-gym-promo-videos-secunderabad" element={<FitnessGymPromoVideosSecunderabad />} />
        <Route path="/fitness-gym-promo-videos-kondapur" element={<FitnessGymPromoVideosKondapur />} />
        <Route path="/fitness-gym-promo-videos-jubilee-hills" element={<FitnessGymPromoVideosJubileeHills />} />
        <Route path="/fitness-gym-promo-videos-madhapur" element={<FitnessGymPromoVideosMadhapur />} />
        <Route path="/fitness-gym-promo-videos-banjara-hills" element={<FitnessGymPromoVideosBanjaraHills />} />
        <Route path="/fitness-gym-promo-videos-kukatpally" element={<FitnessGymPromoVideosKukatpally />} />
        <Route path="/interview-talking-head-video-services" element={<InterviewTalkingHeadVideoServices />} />
        <Route path="/interview-talking-head-video-services-gachibowli" element={<InterviewTalkingHeadVideoServicesGachibowli />} />
        <Route path="/interview-talking-head-video-services-secunderabad" element={<InterviewTalkingHeadVideoServicesSecunderabad />} />
        <Route path="/interview-talking-head-video-services-kondapur" element={<InterviewTalkingHeadVideoServicesKondapur />} />
        <Route path="/interview-talking-head-video-services-jubilee-hills" element={<InterviewTalkingHeadVideoServicesJubileeHills />} />
        <Route path="/interview-talking-head-video-services-madhapur" element={<InterviewTalkingHeadVideoServicesMadhapur />} />
        <Route path="/interview-talking-head-video-services-banjara-hills" element={<InterviewTalkingHeadVideoServicesBanjaraHills />} />
        <Route path="/interview-talking-head-video-services-kukatpally" element={<InterviewTalkingHeadVideoServicesKukatpally />} />
        <Route path="/restaurant-food-promotional-videos-hyderabad" element={<RestaurantFoodPromotionalVideosHyderabad />} />
        <Route path="/restaurant-food-promotional-videos-gachibowli" element={<RestaurantFoodPromotionalVideosGachibowli />} />
        <Route path="/restaurant-food-promotional-videos-secunderabad" element={<RestaurantFoodPromotionalVideosSecunderabad />} />
        <Route path="/restaurant-food-promotional-videos-kondapur" element={<RestaurantFoodPromotionalVideosKondapur />} />
        <Route path="/restaurant-food-promotional-videos-jubilee-hills" element={<RestaurantFoodPromotionalVideosJubileeHills />} />
        <Route path="/restaurant-food-promotional-videos-madhapur" element={<RestaurantFoodPromotionalVideosMadhapur />} />
        <Route path="/restaurant-food-promotional-videos-banjara-hills" element={<RestaurantFoodPromotionalVideosBanjaraHills />} />
        <Route path="/restaurant-food-promotional-videos-kukatpally" element={<RestaurantFoodPromotionalVideosKukatpally />} />
        <Route path="/ecommerce-shopify-store-setup" element={<EcommerceShopifyStoreSetup />} />
        <Route path="/ecommerce-shopify-store-setup-gachibowli" element={<EcommerceShopifyStoreSetupGachibowli />} />
        <Route path="/ecommerce-shopify-store-setup-secunderabad" element={<EcommerceShopifyStoreSetupSecunderabad />} />
        <Route path="/ecommerce-shopify-store-setup-kondapur" element={<EcommerceShopifyStoreSetupKondapur />} />
        <Route path="/ecommerce-shopify-store-setup-jubilee-hills" element={<EcommerceShopifyStoreSetupJubileeHills />} />
        <Route path="/ecommerce-shopify-store-setup-madhapur" element={<EcommerceShopifyStoreSetupMadhapur />} />
        <Route path="/ecommerce-shopify-store-setup-banjara-hills" element={<EcommerceShopifyStoreSetupBanjaraHills />} />
        <Route path="/ecommerce-shopify-store-setup-kukatpally" element={<EcommerceShopifyStoreSetupKukatpally />} />
        <Route path="/music-video-song-reel-production" element={<MusicVideoSongReelProduction />} />
        <Route path="/music-video-song-reel-production-gachibowli" element={<MusicVideoSongReelProductionGachibowli />} />
        <Route path="/music-video-song-reel-production-secunderabad" element={<MusicVideoSongReelProductionSecunderabad />} />
        <Route path="/music-video-song-reel-production-kondapur" element={<MusicVideoSongReelProductionKondapur />} />
        <Route path="/music-video-song-reel-production-jubilee-hills" element={<MusicVideoSongReelProductionJubileeHills />} />
        <Route path="/music-video-song-reel-production-madhapur" element={<MusicVideoSongReelProductionMadhapur />} />
        <Route path="/music-video-song-reel-production-banjara-hills" element={<MusicVideoSongReelProductionBanjaraHills />} />
        <Route path="/music-video-song-reel-production-kukatpally" element={<MusicVideoSongReelProductionKukatpally />} />
        <Route path="/professional-creative-services-agency" element={<ProfessionalCreativeServicesAgency />} />
        <Route path="/professional-creative-services-agency-gachibowli" element={<ProfessionalCreativeServicesAgencyGachibowli />} />
        <Route path="/professional-creative-services-agency-secunderabad" element={<ProfessionalCreativeServicesAgencySecunderabad />} />
        <Route path="/professional-creative-services-agency-kondapur" element={<ProfessionalCreativeServicesAgencyKondapur />} />
        <Route path="/professional-creative-services-agency-jubilee-hills" element={<ProfessionalCreativeServicesAgencyJubileeHills />} />
        <Route path="/professional-creative-services-agency-madhapur" element={<ProfessionalCreativeServicesAgencyMadhapur />} />
        <Route path="/professional-creative-services-agency-banjara-hills" element={<ProfessionalCreativeServicesAgencyBanjaraHills />} />
        <Route path="/professional-creative-services-agency-kukatpally" element={<ProfessionalCreativeServicesAgencyKukatpally />} />
        <Route path="/corporate-promo-video-production" element={<CorporatePromoVideoProduction />} />
        <Route path="/corporate-promo-video-production-gachibowli" element={<CorporatePromoVideoProductionGachibowli />} />
        <Route path="/corporate-promo-video-production-secunderabad" element={<CorporatePromoVideoProductionSecunderabad />} />
        <Route path="/corporate-promo-video-production-kondapur" element={<CorporatePromoVideoProductionKondapur />} />
        <Route path="/corporate-promo-video-production-jubilee-hills" element={<CorporatePromoVideoProductionJubileeHills />} />
        <Route path="/corporate-promo-video-production-madhapur" element={<CorporatePromoVideoProductionMadhapur />} />
        <Route path="/corporate-promo-video-production-banjara-hills" element={<CorporatePromoVideoProductionBanjaraHills />} />
        <Route path="/corporate-promo-video-production-kukatpally" element={<CorporatePromoVideoProductionKukatpally />} />
        <Route path="/database-setup-and-optimization-services" element={<DatabaseSetupAndOptimizationServices />} />
        <Route path="/database-setup-and-optimization-services-gachibowli" element={<DatabaseSetupAndOptimizationServicesGachibowli />} />
        <Route path="/database-setup-and-optimization-services-secunderabad" element={<DatabaseSetupAndOptimizationServicesSecunderabad />} />
        <Route path="/database-setup-and-optimization-services-kondapur" element={<DatabaseSetupAndOptimizationServicesKondapur />} />
        <Route path="/database-setup-and-optimization-services-jubilee-hills" element={<DatabaseSetupAndOptimizationServicesJubileeHills />} />
        <Route path="/database-setup-and-optimization-services-madhapur" element={<DatabaseSetupAndOptimizationServicesMadhapur />} />
        <Route path="/database-setup-and-optimization-services-banjara-hills" element={<DatabaseSetupAndOptimizationServicesBanjaraHills />} />
        <Route path="/database-setup-and-optimization-services-kukatpally" element={<DatabaseSetupAndOptimizationServicesKukatpally />} />
        <Route path="/landing-page-portfolio-website-design" element={<LandingPagePortfolioWebsiteDesign />} />
        <Route path="/landing-page-portfolio-website-design-gachibowli" element={<LandingPagePortfolioWebsiteDesignGachibowli />} />
        <Route path="/landing-page-portfolio-website-design-secunderabad" element={<LandingPagePortfolioWebsiteDesignSecunderabad />} />
        <Route path="/landing-page-portfolio-website-design-kondapur" element={<LandingPagePortfolioWebsiteDesignKondapur />} />
        <Route path="/landing-page-portfolio-website-design-jubilee-hills" element={<LandingPagePortfolioWebsiteDesignJubileeHills />} />
        <Route path="/landing-page-portfolio-website-design-madhapur" element={<LandingPagePortfolioWebsiteDesignMadhapur />} />
        <Route path="/landing-page-portfolio-website-design-banjara-hills" element={<LandingPagePortfolioWebsiteDesignBanjaraHills />} />
        <Route path="/landing-page-portfolio-website-design-kukatpally" element={<LandingPagePortfolioWebsiteDesignKukatpally />} />
        <Route path="/ui-ux-design-prototyping-services" element={<UiUxDesignPrototypingServices />} />
        <Route path="/ui-ux-design-prototyping-services-gachibowli" element={<UiUxDesignPrototypingServicesGachibowli />} />
        <Route path="/ui-ux-design-prototyping-services-secunderabad" element={<UiUxDesignPrototypingServicesSecunderabad />} />
        <Route path="/ui-ux-design-prototyping-services-kondapur" element={<UiUxDesignPrototypingServicesKondapur />} />
        <Route path="/ui-ux-design-prototyping-services-jubilee-hills" element={<UiUxDesignPrototypingServicesJubileeHills />} />
        <Route path="/ui-ux-design-prototyping-services-madhapur" element={<UiUxDesignPrototypingServicesMadhapur />} />
        <Route path="/ui-ux-design-prototyping-services-banjara-hills" element={<UiUxDesignPrototypingServicesBanjaraHills />} />
        <Route path="/ui-ux-design-prototyping-services-kukatpally" element={<UiUxDesignPrototypingServicesKukatpally />} />
        <Route path="/custom-website-development-services" element={<CustomWebsiteDevelopmentServices />} />
        <Route path="/custom-website-development-services-gachibowli" element={<CustomWebsiteDevelopmentServicesGachibowli />} />
        <Route path="/custom-website-development-services-secunderabad" element={<CustomWebsiteDevelopmentServicesSecunderabad />} />
        <Route path="/custom-website-development-services-kondapur" element={<CustomWebsiteDevelopmentServicesKondapur />} />
        <Route path="/custom-website-development-services-jubilee-hills" element={<CustomWebsiteDevelopmentServicesJubileeHills />} />
        <Route path="/custom-website-development-services-madhapur" element={<CustomWebsiteDevelopmentServicesMadhapur />} />
        <Route path="/custom-website-development-services-banjara-hills" element={<CustomWebsiteDevelopmentServicesBanjaraHills />} />
        <Route path="/custom-website-development-services-kukatpally" element={<CustomWebsiteDevelopmentServicesKukatpally />} />
        <Route path="/youtube-shorts-video-editors" element={<YoutubeShortsVideoEditors />} />
        <Route path="/youtube-shorts-video-editors-gachibowli" element={<YoutubeShortsVideoEditorsGachibowli />} />
        <Route path="/youtube-shorts-video-editors-secunderabad" element={<YoutubeShortsVideoEditorsSecunderabad />} />
        <Route path="/youtube-shorts-video-editors-kondapur" element={<YoutubeShortsVideoEditorsKondapur />} />
        <Route path="/youtube-shorts-video-editors-jubilee-hills" element={<YoutubeShortsVideoEditorsJubileeHills />} />
        <Route path="/youtube-shorts-video-editors-madhapur" element={<YoutubeShortsVideoEditorsMadhapur />} />
        <Route path="/youtube-shorts-video-editors-banjara-hills" element={<YoutubeShortsVideoEditorsBanjaraHills />} />
        <Route path="/youtube-shorts-video-editors-kukatpally" element={<YoutubeShortsVideoEditorsKukatpally />} />
        <Route path="/business-promo-reels-creation" element={<BusinessPromoReelsCreation />} />
        <Route path="/business-promo-reels-creation-gachibowli" element={<BusinessPromoReelsCreationGachibowli />} />
        <Route path="/business-promo-reels-creation-secunderabad" element={<BusinessPromoReelsCreationSecunderabad />} />
        <Route path="/business-promo-reels-creation-kondapur" element={<BusinessPromoReelsCreationKondapur />} />
        <Route path="/business-promo-reels-creation-jubilee-hills" element={<BusinessPromoReelsCreationJubileeHills />} />
        <Route path="/business-promo-reels-creation-madhapur" element={<BusinessPromoReelsCreationMadhapur />} />
        <Route path="/business-promo-reels-creation-banjara-hills" element={<BusinessPromoReelsCreationBanjaraHills />} />
        <Route path="/business-promo-reels-creation-kukatpally" element={<BusinessPromoReelsCreationKukatpally />} />
        <Route path="/fitness-transformation-reels-editing" element={<FitnessTransformationReelsEditing />} />
        <Route path="/fitness-transformation-reels-editing-gachibowli" element={<FitnessTransformationReelsEditingGachibowli />} />
        <Route path="/fitness-transformation-reels-editing-secunderabad" element={<FitnessTransformationReelsEditingSecunderabad />} />
        <Route path="/fitness-transformation-reels-editing-kondapur" element={<FitnessTransformationReelsEditingKondapur />} />
        <Route path="/fitness-transformation-reels-editing-jubilee-hills" element={<FitnessTransformationReelsEditingJubileeHills />} />
        <Route path="/fitness-transformation-reels-editing-madhapur" element={<FitnessTransformationReelsEditingMadhapur />} />
        <Route path="/fitness-transformation-reels-editing-banjara-hills" element={<FitnessTransformationReelsEditingBanjaraHills />} />
        <Route path="/fitness-transformation-reels-editing-kukatpally" element={<FitnessTransformationReelsEditingKukatpally />} />
        <Route path="/instagram-feed-reels-video-editing" element={<InstagramFeedReelsVideoEditing />} />
        <Route path="/instagram-feed-reels-video-editing-gachibowli" element={<InstagramFeedReelsVideoEditingGachibowli />} />
        <Route path="/instagram-feed-reels-video-editing-secunderabad" element={<InstagramFeedReelsVideoEditingSecunderabad />} />
        <Route path="/instagram-feed-reels-video-editing-kondapur" element={<InstagramFeedReelsVideoEditingKondapur />} />
        <Route path="/instagram-feed-reels-video-editing-jubilee-hills" element={<InstagramFeedReelsVideoEditingJubileeHills />} />
        <Route path="/instagram-feed-reels-video-editing-madhapur" element={<InstagramFeedReelsVideoEditingMadhapur />} />
        <Route path="/instagram-feed-reels-video-editing-banjara-hills" element={<InstagramFeedReelsVideoEditingBanjaraHills />} />
        <Route path="/instagram-feed-reels-video-editing-kukatpally" element={<InstagramFeedReelsVideoEditingKukatpally />} />
        <Route path="/personal-portfolio-reels-creation" element={<PersonalPortfolioReelsCreation />} />
        <Route path="/personal-portfolio-reels-creation-gachibowli" element={<PersonalPortfolioReelsCreationGachibowli />} />
        <Route path="/personal-portfolio-reels-creation-secunderabad" element={<PersonalPortfolioReelsCreationSecunderabad />} />
        <Route path="/personal-portfolio-reels-creation-kondapur" element={<PersonalPortfolioReelsCreationKondapur />} />
        <Route path="/personal-portfolio-reels-creation-jubilee-hills" element={<PersonalPortfolioReelsCreationJubileeHills />} />
        <Route path="/personal-portfolio-reels-creation-madhapur" element={<PersonalPortfolioReelsCreationMadhapur />} />
        <Route path="/personal-portfolio-reels-creation-banjara-hills" element={<PersonalPortfolioReelsCreationBanjaraHills />} />
        <Route path="/personal-portfolio-reels-creation-kukatpally" element={<PersonalPortfolioReelsCreationKukatpally />} />
        <Route path="/podcast-interview-clips-editing" element={<PodcastInterviewClipsEditing />} />
        <Route path="/podcast-interview-clips-editing-gachibowli" element={<PodcastInterviewClipsEditingGachibowli />} />
        <Route path="/podcast-interview-clips-editing-secunderabad" element={<PodcastInterviewClipsEditingSecunderabad />} />
        <Route path="/podcast-interview-clips-editing-kondapur" element={<PodcastInterviewClipsEditingKondapur />} />
        <Route path="/podcast-interview-clips-editing-jubilee-hills" element={<PodcastInterviewClipsEditingJubileeHills />} />
        <Route path="/podcast-interview-clips-editing-madhapur" element={<PodcastInterviewClipsEditingMadhapur />} />
        <Route path="/podcast-interview-clips-editing-banjara-hills" element={<PodcastInterviewClipsEditingBanjaraHills />} />
        <Route path="/podcast-interview-clips-editing-kukatpally" element={<PodcastInterviewClipsEditingKukatpally />} />
        <Route path="/product-brand-reels-production" element={<ProductBrandReelsProduction />} />
        <Route path="/product-brand-reels-production-gachibowli" element={<ProductBrandReelsProductionGachibowli />} />
        <Route path="/product-brand-reels-production-secunderabad" element={<ProductBrandReelsProductionSecunderabad />} />
        <Route path="/product-brand-reels-production-kondapur" element={<ProductBrandReelsProductionKondapur />} />
        <Route path="/product-brand-reels-production-jubilee-hills" element={<ProductBrandReelsProductionJubileeHills />} />
        <Route path="/product-brand-reels-production-madhapur" element={<ProductBrandReelsProductionMadhapur />} />
        <Route path="/product-brand-reels-production-banjara-hills" element={<ProductBrandReelsProductionBanjaraHills />} />
        <Route path="/product-brand-reels-production-kukatpally" element={<ProductBrandReelsProductionKukatpally />} />
        <Route path="/restaurant-food-reels-production" element={<RestaurantFoodReelsProduction />} />
        <Route path="/restaurant-food-reels-production-gachibowli" element={<RestaurantFoodReelsProductionGachibowli />} />
        <Route path="/restaurant-food-reels-production-secunderabad" element={<RestaurantFoodReelsProductionSecunderabad />} />
        <Route path="/restaurant-food-reels-production-kondapur" element={<RestaurantFoodReelsProductionKondapur />} />
        <Route path="/restaurant-food-reels-production-jubilee-hills" element={<RestaurantFoodReelsProductionJubileeHills />} />
        <Route path="/restaurant-food-reels-production-madhapur" element={<RestaurantFoodReelsProductionMadhapur />} />
        <Route path="/restaurant-food-reels-production-banjara-hills" element={<RestaurantFoodReelsProductionBanjaraHills />} />
        <Route path="/restaurant-food-reels-production-kukatpally" element={<RestaurantFoodReelsProductionKukatpally />} />
        <Route path="/wedding-event-highlight-reels" element={<WeddingEventHighlightReels />} />
        <Route path="/wedding-event-highlight-reels-gachibowli" element={<WeddingEventHighlightReelsGachibowli />} />
        <Route path="/wedding-event-highlight-reels-secunderabad" element={<WeddingEventHighlightReelsSecunderabad />} />
        <Route path="/wedding-event-highlight-reels-kondapur" element={<WeddingEventHighlightReelsKondapur />} />
        <Route path="/wedding-event-highlight-reels-jubilee-hills" element={<WeddingEventHighlightReelsJubileeHills />} />
        <Route path="/wedding-event-highlight-reels-madhapur" element={<WeddingEventHighlightReelsMadhapur />} />
        <Route path="/wedding-event-highlight-reels-banjara-hills" element={<WeddingEventHighlightReelsBanjaraHills />} />
        <Route path="/wedding-event-highlight-reels-kukatpally" element={<WeddingEventHighlightReelsKukatpally />} />
        <Route path="/birthday-party-planning-services-hyderabad" element={<BirthdayPartyPlanningServicesHyderabad />} />
        <Route path="/birthday-party-planning-services-gachibowli" element={<BirthdayPartyPlanningServicesGachibowli />} />
        <Route path="/birthday-party-planning-services-secunderabad" element={<BirthdayPartyPlanningServicesSecunderabad />} />
        <Route path="/birthday-party-planning-services-kondapur" element={<BirthdayPartyPlanningServicesKondapur />} />
        <Route path="/birthday-party-planning-services-jubilee-hills" element={<BirthdayPartyPlanningServicesJubileeHills />} />
        <Route path="/birthday-party-planning-services-madhapur" element={<BirthdayPartyPlanningServicesMadhapur />} />
        <Route path="/birthday-party-planning-services-banjara-hills" element={<BirthdayPartyPlanningServicesBanjaraHills />} />
        <Route path="/birthday-party-planning-services-kukatpally" element={<BirthdayPartyPlanningServicesKukatpally />} />
        <Route path="/surprise-party-planning-services" element={<SurprisePartyPlanningServices />} />
        <Route path="/surprise-party-planning-services-gachibowli" element={<SurprisePartyPlanningServicesGachibowli />} />
        <Route path="/surprise-party-planning-services-secunderabad" element={<SurprisePartyPlanningServicesSecunderabad />} />
        <Route path="/surprise-party-planning-services-kondapur" element={<SurprisePartyPlanningServicesKondapur />} />
        <Route path="/surprise-party-planning-services-jubilee-hills" element={<SurprisePartyPlanningServicesJubileeHills />} />
        <Route path="/surprise-party-planning-services-madhapur" element={<SurprisePartyPlanningServicesMadhapur />} />
        <Route path="/surprise-party-planning-services-banjara-hills" element={<SurprisePartyPlanningServicesBanjaraHills />} />
        <Route path="/surprise-party-planning-services-kukatpally" element={<SurprisePartyPlanningServicesKukatpally />} />
        <Route path="/ai-chatbot-integration-services" element={<AiChatbotIntegrationServices />} />
        <Route path="/ai-chatbot-integration-services-gachibowli" element={<AiChatbotIntegrationServicesGachibowli />} />
        <Route path="/ai-chatbot-integration-services-secunderabad" element={<AiChatbotIntegrationServicesSecunderabad />} />
        <Route path="/ai-chatbot-integration-services-kondapur" element={<AiChatbotIntegrationServicesKondapur />} />
        <Route path="/ai-chatbot-integration-services-jubilee-hills" element={<AiChatbotIntegrationServicesJubileeHills />} />
        <Route path="/ai-chatbot-integration-services-madhapur" element={<AiChatbotIntegrationServicesMadhapur />} />
        <Route path="/ai-chatbot-integration-services-banjara-hills" element={<AiChatbotIntegrationServicesBanjaraHills />} />
        <Route path="/ai-chatbot-integration-services-kukatpally" element={<AiChatbotIntegrationServicesKukatpally />} />
        <Route path="/house-party-event-planning-services" element={<HousePartyEventPlanningServices />} />
        <Route path="/house-party-event-planning-services-gachibowli" element={<HousePartyEventPlanningServicesGachibowli />} />
        <Route path="/house-party-event-planning-services-secunderabad" element={<HousePartyEventPlanningServicesSecunderabad />} />
        <Route path="/house-party-event-planning-services-kondapur" element={<HousePartyEventPlanningServicesKondapur />} />
        <Route path="/house-party-event-planning-services-jubilee-hills" element={<HousePartyEventPlanningServicesJubileeHills />} />
        <Route path="/house-party-event-planning-services-madhapur" element={<HousePartyEventPlanningServicesMadhapur />} />
        <Route path="/house-party-event-planning-services-banjara-hills" element={<HousePartyEventPlanningServicesBanjaraHills />} />
        <Route path="/house-party-event-planning-services-kukatpally" element={<HousePartyEventPlanningServicesKukatpally />} />
        <Route path="/logo-brand-design" element={<LogoBrandDesign />} />
        <Route path="/logo-brand-design-gachibowli" element={<LogoBrandDesignGachibowli />} />
        <Route path="/logo-brand-design-secunderabad" element={<LogoBrandDesignSecunderabad />} />
        <Route path="/logo-brand-design-kondapur" element={<LogoBrandDesignKondapur />} />
        <Route path="/logo-brand-design-jubilee-hills" element={<LogoBrandDesignJubileeHills />} />
        <Route path="/logo-brand-design-madhapur" element={<LogoBrandDesignMadhapur />} />
        <Route path="/logo-brand-design-banjara-hills" element={<LogoBrandDesignBanjaraHills />} />
        <Route path="/logo-brand-design-kukatpally" element={<LogoBrandDesignKukatpally />} />
        <Route path="/modular-kitchen-designers-hyderabad" element={<ModularKitchenDesignersHyderabad />} />
        <Route path="/modular-kitchen-designers-gachibowli" element={<ModularKitchenDesignersGachibowli />} />
        <Route path="/modular-kitchen-designers-secunderabad" element={<ModularKitchenDesignersSecunderabad />} />
        <Route path="/modular-kitchen-designers-kondapur" element={<ModularKitchenDesignersKondapur />} />
        <Route path="/modular-kitchen-designers-jubilee-hills" element={<ModularKitchenDesignersJubileeHills />} />
        <Route path="/modular-kitchen-designers-madhapur" element={<ModularKitchenDesignersMadhapur />} />
        <Route path="/modular-kitchen-designers-banjara-hills" element={<ModularKitchenDesignersBanjaraHills />} />
        <Route path="/modular-kitchen-designers-kukatpally" element={<ModularKitchenDesignersKukatpally />} />
        <Route path="/bedroom-living-room-interior-design" element={<BedroomLivingRoomInteriorDesign />} />
        <Route path="/bedroom-living-room-interior-design-gachibowli" element={<BedroomLivingRoomInteriorDesignGachibowli />} />
        <Route path="/bedroom-living-room-interior-design-secunderabad" element={<BedroomLivingRoomInteriorDesignSecunderabad />} />
        <Route path="/bedroom-living-room-interior-design-kondapur" element={<BedroomLivingRoomInteriorDesignKondapur />} />
        <Route path="/bedroom-living-room-interior-design-jubilee-hills" element={<BedroomLivingRoomInteriorDesignJubileeHills />} />
        <Route path="/bedroom-living-room-interior-design-madhapur" element={<BedroomLivingRoomInteriorDesignMadhapur />} />
        <Route path="/bedroom-living-room-interior-design-banjara-hills" element={<BedroomLivingRoomInteriorDesignBanjaraHills />} />
        <Route path="/bedroom-living-room-interior-design-kukatpally" element={<BedroomLivingRoomInteriorDesignKukatpally />} />
        <Route path="/home-interior-design-consultation" element={<HomeInteriorDesignConsultation />} />
        <Route path="/home-interior-design-consultation-gachibowli" element={<HomeInteriorDesignConsultationGachibowli />} />
        <Route path="/home-interior-design-consultation-secunderabad" element={<HomeInteriorDesignConsultationSecunderabad />} />
        <Route path="/home-interior-design-consultation-kondapur" element={<HomeInteriorDesignConsultationKondapur />} />
        <Route path="/home-interior-design-consultation-jubilee-hills" element={<HomeInteriorDesignConsultationJubileeHills />} />
        <Route path="/home-interior-design-consultation-madhapur" element={<HomeInteriorDesignConsultationMadhapur />} />
        <Route path="/home-interior-design-consultation-banjara-hills" element={<HomeInteriorDesignConsultationBanjaraHills />} />
        <Route path="/home-interior-design-consultation-kukatpally" element={<HomeInteriorDesignConsultationKukatpally />} />
        <Route path="/motion-graphics-title-animation" element={<MotionGraphicsTitleAnimation />} />
        <Route path="/motion-graphics-title-animation-gachibowli" element={<MotionGraphicsTitleAnimationGachibowli />} />
        <Route path="/motion-graphics-title-animation-secunderabad" element={<MotionGraphicsTitleAnimationSecunderabad />} />
        <Route path="/motion-graphics-title-animation-kondapur" element={<MotionGraphicsTitleAnimationKondapur />} />
        <Route path="/motion-graphics-title-animation-jubilee-hills" element={<MotionGraphicsTitleAnimationJubileeHills />} />
        <Route path="/motion-graphics-title-animation-madhapur" element={<MotionGraphicsTitleAnimationMadhapur />} />
        <Route path="/motion-graphics-title-animation-banjara-hills" element={<MotionGraphicsTitleAnimationBanjaraHills />} />
        <Route path="/motion-graphics-title-animation-kukatpally" element={<MotionGraphicsTitleAnimationKukatpally />} />
        <Route path="/podcast-video-editors-hyderabad" element={<PodcastVideoEditorsHyderabad />} />
        <Route path="/podcast-video-editors-gachibowli" element={<PodcastVideoEditorsGachibowli />} />
        <Route path="/podcast-video-editors-secunderabad" element={<PodcastVideoEditorsSecunderabad />} />
        <Route path="/podcast-video-editors-kondapur" element={<PodcastVideoEditorsKondapur />} />
        <Route path="/podcast-video-editors-jubilee-hills" element={<PodcastVideoEditorsJubileeHills />} />
        <Route path="/podcast-video-editors-madhapur" element={<PodcastVideoEditorsMadhapur />} />
        <Route path="/podcast-video-editors-banjara-hills" element={<PodcastVideoEditorsBanjaraHills />} />
        <Route path="/podcast-video-editors-kukatpally" element={<PodcastVideoEditorsKukatpally />} />
        <Route path="/video-editing-services" element={<VideoEditingServices />} />
        <Route path="/video-editing-services-gachibowli" element={<VideoEditingServicesGachibowli />} />
        <Route path="/video-editing-services-secunderabad" element={<VideoEditingServicesSecunderabad />} />
        <Route path="/video-editing-services-kondapur" element={<VideoEditingServicesKondapur />} />
        <Route path="/video-editing-services-jubilee-hills" element={<VideoEditingServicesJubileeHills />} />
        <Route path="/video-editing-services-madhapur" element={<VideoEditingServicesMadhapur />} />
        <Route path="/video-editing-services-banjara-hills" element={<VideoEditingServicesBanjaraHills />} />
        <Route path="/video-editing-services-kukatpally" element={<VideoEditingServicesKukatpally />} />
        <Route path="/wedding-event-video-editing" element={<WeddingEventVideoEditing />} />
        <Route path="/wedding-event-video-editing-gachibowli" element={<WeddingEventVideoEditingGachibowli />} />
        <Route path="/wedding-event-video-editing-secunderabad" element={<WeddingEventVideoEditingSecunderabad />} />
        <Route path="/wedding-event-video-editing-kondapur" element={<WeddingEventVideoEditingKondapur />} />
        <Route path="/wedding-event-video-editing-jubilee-hills" element={<WeddingEventVideoEditingJubileeHills />} />
        <Route path="/wedding-event-video-editing-madhapur" element={<WeddingEventVideoEditingMadhapur />} />
        <Route path="/wedding-event-video-editing-banjara-hills" element={<WeddingEventVideoEditingBanjaraHills />} />
        <Route path="/wedding-event-video-editing-kukatpally" element={<WeddingEventVideoEditingKukatpally />} />
        <Route path="/birthday-party-anchors-hosts" element={<BirthdayPartyAnchorsHosts />} />
        <Route path="/birthday-party-anchors-hosts-gachibowli" element={<BirthdayPartyAnchorsHostsGachibowli />} />
        <Route path="/birthday-party-anchors-hosts-secunderabad" element={<BirthdayPartyAnchorsHostsSecunderabad />} />
        <Route path="/birthday-party-anchors-hosts-kondapur" element={<BirthdayPartyAnchorsHostsKondapur />} />
        <Route path="/birthday-party-anchors-hosts-jubilee-hills" element={<BirthdayPartyAnchorsHostsJubileeHills />} />
        <Route path="/birthday-party-anchors-hosts-madhapur" element={<BirthdayPartyAnchorsHostsMadhapur />} />
        <Route path="/birthday-party-anchors-hosts-banjara-hills" element={<BirthdayPartyAnchorsHostsBanjaraHills />} />
        <Route path="/birthday-party-anchors-hosts-kukatpally" element={<BirthdayPartyAnchorsHostsKukatpally />} />
        <Route path="/office-commercial-interior-design" element={<OfficeCommercialInteriorDesign />} />
        <Route path="/office-commercial-interior-design-gachibowli" element={<OfficeCommercialInteriorDesignGachibowli />} />
        <Route path="/office-commercial-interior-design-secunderabad" element={<OfficeCommercialInteriorDesignSecunderabad />} />
        <Route path="/office-commercial-interior-design-kondapur" element={<OfficeCommercialInteriorDesignKondapur />} />
        <Route path="/office-commercial-interior-design-jubilee-hills" element={<OfficeCommercialInteriorDesignJubileeHills />} />
        <Route path="/office-commercial-interior-design-madhapur" element={<OfficeCommercialInteriorDesignMadhapur />} />
        <Route path="/office-commercial-interior-design-banjara-hills" element={<OfficeCommercialInteriorDesignBanjaraHills />} />
        <Route path="/office-commercial-interior-design-kukatpally" element={<OfficeCommercialInteriorDesignKukatpally />} />
        <Route path="/furniture-selection-and-sourcing" element={<FurnitureSelectionAndSourcing />} />
        <Route path="/furniture-selection-and-sourcing-gachibowli" element={<FurnitureSelectionAndSourcingGachibowli />} />
        <Route path="/furniture-selection-and-sourcing-secunderabad" element={<FurnitureSelectionAndSourcingSecunderabad />} />
        <Route path="/furniture-selection-and-sourcing-kondapur" element={<FurnitureSelectionAndSourcingKondapur />} />
        <Route path="/furniture-selection-and-sourcing-jubilee-hills" element={<FurnitureSelectionAndSourcingJubileeHills />} />
        <Route path="/furniture-selection-and-sourcing-madhapur" element={<FurnitureSelectionAndSourcingMadhapur />} />
        <Route path="/furniture-selection-and-sourcing-banjara-hills" element={<FurnitureSelectionAndSourcingBanjaraHills />} />
        <Route path="/furniture-selection-and-sourcing-kukatpally" element={<FurnitureSelectionAndSourcingKukatpally />} />
        <Route path="/kids-party-entertainers-magicians" element={<KidsPartyEntertainersMagicians />} />
        <Route path="/kids-party-entertainers-magicians-gachibowli" element={<KidsPartyEntertainersMagiciansGachibowli />} />
        <Route path="/kids-party-entertainers-magicians-secunderabad" element={<KidsPartyEntertainersMagiciansSecunderabad />} />
        <Route path="/kids-party-entertainers-magicians-kondapur" element={<KidsPartyEntertainersMagiciansKondapur />} />
        <Route path="/kids-party-entertainers-magicians-jubilee-hills" element={<KidsPartyEntertainersMagiciansJubileeHills />} />
        <Route path="/kids-party-entertainers-magicians-madhapur" element={<KidsPartyEntertainersMagiciansMadhapur />} />
        <Route path="/kids-party-entertainers-magicians-banjara-hills" element={<KidsPartyEntertainersMagiciansBanjaraHills />} />
        <Route path="/kids-party-entertainers-magicians-kukatpally" element={<KidsPartyEntertainersMagiciansKukatpally />} />
        <Route path="/home-wall-painting-services" element={<HomeWallPaintingServices />} />
        <Route path="/home-wall-painting-services-gachibowli" element={<HomeWallPaintingServicesGachibowli />} />
        <Route path="/home-wall-painting-services-secunderabad" element={<HomeWallPaintingServicesSecunderabad />} />
        <Route path="/home-wall-painting-services-kondapur" element={<HomeWallPaintingServicesKondapur />} />
        <Route path="/home-wall-painting-services-jubilee-hills" element={<HomeWallPaintingServicesJubileeHills />} />
        <Route path="/home-wall-painting-services-madhapur" element={<HomeWallPaintingServicesMadhapur />} />
        <Route path="/home-wall-painting-services-banjara-hills" element={<HomeWallPaintingServicesBanjaraHills />} />
        <Route path="/home-wall-painting-services-kukatpally" element={<HomeWallPaintingServicesKukatpally />} />
        <Route path="/budget-home-interior-makeover" element={<BudgetHomeInteriorMakeover />} />
        <Route path="/budget-home-interior-makeover-gachibowli" element={<BudgetHomeInteriorMakeoverGachibowli />} />
        <Route path="/budget-home-interior-makeover-secunderabad" element={<BudgetHomeInteriorMakeoverSecunderabad />} />
        <Route path="/budget-home-interior-makeover-kondapur" element={<BudgetHomeInteriorMakeoverKondapur />} />
        <Route path="/budget-home-interior-makeover-jubilee-hills" element={<BudgetHomeInteriorMakeoverJubileeHills />} />
        <Route path="/budget-home-interior-makeover-madhapur" element={<BudgetHomeInteriorMakeoverMadhapur />} />
        <Route path="/budget-home-interior-makeover-banjara-hills" element={<BudgetHomeInteriorMakeoverBanjaraHills />} />
        <Route path="/budget-home-interior-makeover-kukatpally" element={<BudgetHomeInteriorMakeoverKukatpally />} />
        <Route path="/wardrobe-storage-cabinet-design" element={<WardrobeStorageCabinetDesign />} />
        <Route path="/wardrobe-storage-cabinet-design-gachibowli" element={<WardrobeStorageCabinetDesignGachibowli />} />
        <Route path="/wardrobe-storage-cabinet-design-secunderabad" element={<WardrobeStorageCabinetDesignSecunderabad />} />
        <Route path="/wardrobe-storage-cabinet-design-kondapur" element={<WardrobeStorageCabinetDesignKondapur />} />
        <Route path="/wardrobe-storage-cabinet-design-jubilee-hills" element={<WardrobeStorageCabinetDesignJubileeHills />} />
        <Route path="/wardrobe-storage-cabinet-design-madhapur" element={<WardrobeStorageCabinetDesignMadhapur />} />
        <Route path="/wardrobe-storage-cabinet-design-banjara-hills" element={<WardrobeStorageCabinetDesignBanjaraHills />} />
        <Route path="/wardrobe-storage-cabinet-design-kukatpally" element={<WardrobeStorageCabinetDesignKukatpally />} />
        <Route path="/residential-commercial-lighting-design" element={<ResidentialCommercialLightingDesign />} />
        <Route path="/residential-commercial-lighting-design-gachibowli" element={<ResidentialCommercialLightingDesignGachibowli />} />
        <Route path="/residential-commercial-lighting-design-secunderabad" element={<ResidentialCommercialLightingDesignSecunderabad />} />
        <Route path="/residential-commercial-lighting-design-kondapur" element={<ResidentialCommercialLightingDesignKondapur />} />
        <Route path="/residential-commercial-lighting-design-jubilee-hills" element={<ResidentialCommercialLightingDesignJubileeHills />} />
        <Route path="/residential-commercial-lighting-design-madhapur" element={<ResidentialCommercialLightingDesignMadhapur />} />
        <Route path="/residential-commercial-lighting-design-banjara-hills" element={<ResidentialCommercialLightingDesignBanjaraHills />} />
        <Route path="/residential-commercial-lighting-design-kukatpally" element={<ResidentialCommercialLightingDesignKukatpally />} />
        <Route path="/mobile-app-ui-ux-revamp" element={<MobileAppUiUxRevamp />} />
        <Route path="/mobile-app-ui-ux-revamp-gachibowli" element={<MobileAppUiUxRevampGachibowli />} />
        <Route path="/mobile-app-ui-ux-revamp-secunderabad" element={<MobileAppUiUxRevampSecunderabad />} />
        <Route path="/mobile-app-ui-ux-revamp-kondapur" element={<MobileAppUiUxRevampKondapur />} />
        <Route path="/mobile-app-ui-ux-revamp-jubilee-hills" element={<MobileAppUiUxRevampJubileeHills />} />
        <Route path="/mobile-app-ui-ux-revamp-madhapur" element={<MobileAppUiUxRevampMadhapur />} />
        <Route path="/mobile-app-ui-ux-revamp-banjara-hills" element={<MobileAppUiUxRevampBanjaraHills />} />
        <Route path="/mobile-app-ui-ux-revamp-kukatpally" element={<MobileAppUiUxRevampKukatpally />} />
        <Route path="/wedding-sangeet-mc-anchors" element={<WeddingSangeetMcAnchors />} />
        <Route path="/wedding-sangeet-mc-anchors-gachibowli" element={<WeddingSangeetMcAnchorsGachibowli />} />
        <Route path="/wedding-sangeet-mc-anchors-secunderabad" element={<WeddingSangeetMcAnchorsSecunderabad />} />
        <Route path="/wedding-sangeet-mc-anchors-kondapur" element={<WeddingSangeetMcAnchorsKondapur />} />
        <Route path="/wedding-sangeet-mc-anchors-jubilee-hills" element={<WeddingSangeetMcAnchorsJubileeHills />} />
        <Route path="/wedding-sangeet-mc-anchors-madhapur" element={<WeddingSangeetMcAnchorsMadhapur />} />
        <Route path="/wedding-sangeet-mc-anchors-banjara-hills" element={<WeddingSangeetMcAnchorsBanjaraHills />} />
        <Route path="/wedding-sangeet-mc-anchors-kukatpally" element={<WeddingSangeetMcAnchorsKukatpally />} />
      </Routes>
    </Suspense>
  );
}
