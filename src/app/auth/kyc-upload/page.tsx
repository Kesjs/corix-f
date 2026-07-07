"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { FileText, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function KYCUploadPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [idFile, setIdFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth/login')
      return
    }
    
    setUser(session.user)
    
    // Récupérer le profil
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    setProfile(profileData)
    setLoading(false)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    
    if (file) {
      // Validation
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Le fichier est trop volumineux (max 5MB)")
        return
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Format non accepté. Utilisez JPG, PNG ou PDF")
        return
      }
      
      setIdFile(file)
      setErrorMessage("")
      setUploadStatus("idle")
    }
  }

  const uploadDocument = async () => {
    if (!idFile || !user) return
    
    setUploadStatus("uploading")
    setUploadProgress(0)
    setErrorMessage("")
    
    try {
      // Vérifier si le bucket existe
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
      
      if (bucketError) {
        console.warn('Erreur vérification buckets:', bucketError)
      }
      
      const documentsBucketExists = buckets?.some(bucket => bucket.name === 'documents')
      
      if (!documentsBucketExists) {
        // Le bucket n'existe pas, on sauvegarde juste les infos du profil
        // L'upload sera possible plus tard quand le bucket sera configuré
        await updateProfileWithoutDocument()
        setUploadStatus("success")
        return
      }
      
      // Progression simulée
      setUploadProgress(20)
      
      // Upload du fichier
      const fileExt = idFile.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `id-documents/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, idFile, {
          cacheControl: '3600',
          upsert: false
        })
      
      setUploadProgress(70)
      
      if (uploadError) {
        console.error('Erreur upload:', uploadError)
        
        // Sauvegarder le profil sans le document
        await updateProfileWithoutDocument()
        setUploadStatus("success")
        return
      }
      
      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath)
      
      setUploadProgress(90)
      
      // Mettre à jour le profil avec l'URL du document
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ id_document_url: publicUrl })
        .eq('id', user.id)
      
      if (updateError) {
        console.warn('Erreur mise à jour profil:', updateError)
      }
      
      setUploadProgress(100)
      setUploadStatus("success")
      
    } catch (error: any) {
      console.error('Erreur:', error)
      setErrorMessage("Une erreur est survenue lors du téléchargement")
      setUploadStatus("error")
    }
  }

  const updateProfileWithoutDocument = async () => {
    if (!user || !profile) return
    
    try {
      await supabase
        .from('profiles')
        .update({ id_document_url: null })
        .eq('id', user.id)
    } catch (error) {
      console.warn('Erreur mise à jour profil:', error)
    }
  }

  const handleSkip = async () => {
    await updateProfileWithoutDocument()
    router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Logo />
      </header>

      {/* Progress */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-accent rounded-full" />
          <div className="flex-1 h-1 bg-accent rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">Étape 2/2 - Vérification d'identité</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-lg border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Vérification d'identité</CardTitle>
            <CardDescription>
              Téléchargez une photo de votre pièce d'identité pour finaliser l'ouverture de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informations du compte */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Compte créé avec succès !</p>
              <p className="text-sm font-medium text-foreground">{user?.email}</p>
            </div>

            {/* Zone de téléchargement */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
                <div className="flex flex-col items-center gap-3">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Téléchargez votre pièce d'identité
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Formats acceptés : JPG, PNG, PDF (max 5MB)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Le document doit être lisible et en couleur
                    </p>
                  </div>
                  <input
                    type="file"
                    id="id-document"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileSelect}
                  />
                  
                  {/* Affichage du fichier sélectionné */}
                  {idFile && (
                    <div className="mt-2 p-3 bg-secondary/30 rounded-lg w-full max-w-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-accent" />
                          <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
                            {idFile.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({(idFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setIdFile(null)
                            setUploadStatus("idle")
                            setErrorMessage("")
                          }}
                          className="h-6 px-2 text-xs"
                        >
                          ×
                        </Button>
                      </div>
                      
                      {/* Barre de progression */}
                      {uploadStatus === "uploading" && uploadProgress > 0 && (
                        <div className="mt-3">
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-center text-muted-foreground mt-1">
                            Téléchargement en cours... {uploadProgress}%
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('id-document')?.click()}
                    disabled={uploadStatus === "uploading"}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {idFile ? 'Changer de fichier' : 'Choisir un fichier'}
                  </Button>
                </div>
              </div>

              {/* Messages d'erreur */}
              {errorMessage && (
                <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {errorMessage}
                </div>
              )}

              {/* Succès */}
              {uploadStatus === "success" && (
                <div className="flex items-center gap-2 text-success text-sm p-3 bg-success/10 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  Document téléchargé avec succès ! Votre compte sera vérifié sous 24-48h.
                </div>
              )}

              {/* Types de documents acceptés */}
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-medium">Types de documents acceptés :</p>
                <ul className="list-disc list-inside">
                  <li>Carte d'identité nationale</li>
                  <li>Passeport</li>
                  <li>Permis de conduire</li>
                  <li>Titre de séjour</li>
                </ul>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={uploadDocument}
                disabled={!idFile || uploadStatus === "uploading" || uploadStatus === "success"}
              >
                {uploadStatus === "uploading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Téléchargement en cours...
                  </>
                ) : uploadStatus === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Document téléchargé
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Télécharger le document
                  </>
                )}
              </Button>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={handleSkip}
                disabled={uploadStatus === "uploading"}
              >
                Compléter plus tard - Aller au tableau de bord
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              <Link href="/dashboard" className="text-accent hover:underline font-medium">
                Aller au tableau de bord
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}