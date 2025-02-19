import { initializeApp } from "firebase/app";
import {
  doc,
  setDoc,
  collection,
  Firestore,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
  CollectionReference,
  query,
  orderBy,
  getDoc,
  DocumentReference,
  deleteDoc,
} from "firebase/firestore";
import { Ingredient, Recipe, RecipeMetadata, Tag } from "../models";
import { RecipeContext } from "../app/contexts";

// Converters ---------
function convertTagsToObjectArray(tags: Set<Tag>) {
  const plainTags = new Array<Tag>();
  tags.forEach((tag) => plainTags.push({ ...tag }));
  return plainTags;
}

function convertIngredientsToObjectArray(ingredients: Array<Ingredient>) {
  const plainIngredients = new Array<Ingredient>();
  ingredients.forEach((ingredient) => plainIngredients.push({ name: ingredient.name, measurement: { ...ingredient.measurement }  }));
  return plainIngredients;
}

function convertObjectArrayToTags(objs) {
  const tags = new Set<Tag>();
  objs.forEach((obj) => {
    if (obj.name) tags.add(new Tag(obj.name.toString(), obj.color));
  });
  return tags;
}

function convertObjectArrayToIngredients(objs) {
  const ingredients = new Array<Ingredient>();
  objs.forEach((obj) => {
    if (obj.name) {
      ingredients.push({
        name: obj.name,
        measurement: {
          quantity: obj.measurement.quantity,
          unit: obj.measurement.unit
        }
      });
    }
  });
  return ingredients;
}

const recipeConverter = {
  toFirestore: (recipe: Recipe) => ({
      metadata: {
        id: recipe.metadata?.id,
        timestamp: recipe.metadata?.timestamp,
      },
      name: recipe.name,
      tags: convertTagsToObjectArray(recipe.tags),
      cooktime: recipe.cooktime,
      ingredients: convertIngredientsToObjectArray(recipe.ingredients),
      directions: recipe.directions,
      image: recipe.image || "",
      source: recipe.source || "",
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot, options?: SnapshotOptions) => {
    const { name, tags, cooktime, ingredients, directions, metadata, image, source } =
      snapshot.data(options);

    return new Recipe(metadata, name, convertObjectArrayToTags(tags), cooktime, convertObjectArrayToIngredients(ingredients), directions, image, source);
  },
};

/**
 * Collections to serve as sets with simple { name: string } field per object.
 */
const recipeContextConverter = {
  toFirestore: (recipeContext: RecipeContext) => {
    return {
      pantry: [...recipeContext.pantry],
      tags: convertTagsToObjectArray(recipeContext.tags),
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options?: SnapshotOptions) => {
    const { pantry, tags } = snapshot.data(options);
    return {
      pantry: new Set<string>(pantry),
      setPantry: () => {},
      tags: convertObjectArrayToTags(tags),
      setTags: () => {},
    };
  },
};

// Firebase Utils ---------
let firestore: Firestore;
let recipesCollection: CollectionReference<Recipe>;
let recipeContextRef: DocumentReference<RecipeContext>;

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyCEx06gteQrLyWB__TQpDbDbuR3_r3k7SY",
    authDomain: "cookin-cac70.firebaseapp.com",
    projectId: "cookin-cac70",
    storageBucket: "cookin-cac70.firebasestorage.app",
    messagingSenderId: "481722415202",
    appId: "1:481722415202:web:e13691eb94542532c2b93b",
    measurementId: "G-C9Q2F05DGR",
  };
  const app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
  recipesCollection = collection(firestore, "recipes").withConverter(recipeConverter);
  recipeContextRef = doc(firestore, "metadata", "recipe").withConverter(recipeContextConverter);
}

// Recipe Utils ---------

/**
 * Fetch all recipes
 */
export function fetchRecipes() {
  if (!firestore) {
    initializeFirebase();
  }

  const q = query(recipesCollection, orderBy("metadata.timestamp", "desc"));
  return getDocs(q).then((snapshot) => snapshot.docs.map((doc) => doc.data()));
}

/**
 * Get a recipes
 */
export function fetchRecipe(id: string) {
  if (!firestore) {
    initializeFirebase();
  }

  return getDoc(doc(recipesCollection, id)).then(
    (snapshot) => snapshot.exists() && snapshot.data()
  );
}

/**
 * Add a new recipe. id is created during add process. timestamp is updated.
 */
export function addRecipe(newRecipe: Recipe) {
  if (!firestore) {
    initializeFirebase();
  }

  // add created timestamp
  const newRecipeRef = doc(recipesCollection);
  const metadata: RecipeMetadata = { timestamp: Date.now(), id: newRecipeRef.id };
  const fullRecipe: Recipe = { ...newRecipe, metadata };
  return setDoc(newRecipeRef, fullRecipe).then(() => newRecipe);
}

/**
 * Edit a recipe. timestamp is updated.
 */
export function editRecipe(oldRecipeId: string, newRecipe: Recipe) {
  if (!firestore) {
    initializeFirebase();
  }

  const metadata: RecipeMetadata = { timestamp: Date.now(), id: oldRecipeId };
  const updatedRecipe = { ...newRecipe, metadata };
  return setDoc(doc(recipesCollection, oldRecipeId), updatedRecipe).then(() => updatedRecipe);
}

export function fetchRecipeContext() {
  if (!firestore) {
    initializeFirebase();
  }

  return getDoc(recipeContextRef).then((snapshot) => snapshot.exists() && snapshot.data());
}

export function deleteRecipe(recipeId: string) {
  if (!firestore) {
    initializeFirebase();
  }

  deleteDoc(doc(recipesCollection, recipeId));
  return recipeId;
}

export function editRecipeContext(newContext: RecipeContext) {
  if (!firestore) {
    initializeFirebase();
  }
  setDoc(recipeContextRef, newContext);
}
